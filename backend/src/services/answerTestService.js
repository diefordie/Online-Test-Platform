import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Fungsi untuk menyimpan jawaban sementara sebagai draft
export const saveDraftAnswer = async (testId, token, answers) => {
    // Verifikasi token JWT
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('JWT verification failed:', error.message);
        throw new Error('Token tidak valid atau sudah kadaluarsa');
    }

    const userId = decodedToken.id;

    let result;
    try {
        // Ambil result berdasarkan testId, userId, dan attemptNumber terakhir
        result = await prismaClient.result.findFirst({
            where: { testId, userId },
            orderBy: { attemptNumber: 'desc' }, // Urutkan berdasarkan attempt terbaru
        });

        // Jika result belum ada untuk attempt ini, buat entri baru
        if (!result) {
            const newAttemptNumber = 1; // Jika ini adalah attempt pertama
            result = await prismaClient.result.create({
                data: {
                    testId, 
                    userId, 
                    attemptNumber: newAttemptNumber,
                    score: 0,  // Skor awal diinisialisasi ke 0
                },
            });
        }
    } catch (error) {
        console.error('Error fetching or creating result:', error.message);
        throw new Error(`Gagal membuat result baru: ${error.message}`);
    }

    // Simpan atau perbarui detail jawaban
    try {
        for (const answer of answers) {
            const existingDetail = await prismaClient.detail_result.findUnique({
                where: { 
                    optionId_resultId: {
                        optionId: answer.optionId, 
                        resultId: result.id 
                    } 
                },
            });

            if (existingDetail) {
                // Jika sudah ada jawaban untuk optionId ini, perbarui
                await prismaClient.detail_result.update({
                    where: { id: existingDetail.id },
                    data: {
                        userAnswer: answer.selectedOption,
                        status: 'draft',
                    },
                });
            } else {
                // Jika belum ada, buat jawaban baru
                await prismaClient.detail_result.create({
                    data: {
                        optionId: answer.optionId,
                        resultId: result.id,  // Menggunakan resultId yang sama
                        userAnswer: answer.selectedOption,
                        status: 'draft',
                    },
                });
            }
        }
    } catch (error) {
        console.error('Error saving draft answers:', error.message);
        throw new Error(`Gagal menyimpan draft jawaban: ${error.message}`);
    }

    return result.id;
};






// Fungsi untuk memperbarui jawaban draft
export const updateDraftAnswer = async (resultId, oldOptionId, newOptionId, newAnswer) => {
    try {
        console.log('Updating draft answer:', { resultId, oldOptionId, newOptionId, newAnswer });

        // Cari apakah jawaban yang lama ada berdasarkan resultId dan oldOptionId
        const existingDetail = await prismaClient.detail_result.findFirst({
            where: {
                resultId: resultId,
                optionId: oldOptionId,
            },
        });

        if (!existingDetail) {
            console.log(`Draft answer not found for resultId: ${resultId}, oldOptionId: ${oldOptionId}`);
            throw new Error('Draft jawaban tidak ditemukan.');
        }

        // Jika jawaban lama ditemukan, perbarui dengan newOptionId dan newAnswer
        const updatedDetail = await prismaClient.detail_result.update({
            where: { id: existingDetail.id },
            data: {
                optionId: newOptionId,   // Update dengan option baru
                userAnswer: newAnswer,   // Update dengan jawaban baru
                status: 'draft',         // Tetap dalam status 'draft'
            },
        });

        console.log('Updated detail:', updatedDetail);
        return updatedDetail.id;
    } catch (error) {
        console.error(`Failed to update draft answer: ${error.message}`);
        throw new Error(`Gagal memperbarui draft jawaban: ${error.message}`);
    }
};


// Fungsi untuk mengirim jawaban final
export const submitFinalAnswers = async (testId, token) => {
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token tidak valid atau sudah kadaluarsa');
    }

    const userId = decodedToken.id;

    try {
        // Ambil result terakhir dari tabel result yang terkait dengan user dan test
        const result = await prismaClient.result.findFirst({
            where: {
                userId: userId,
                testId: testId,
            },
            orderBy: {
                attemptNumber: 'desc', // Urutkan berdasarkan attemptNumber
            },
        });

        if (!result) {
            throw new Error('Result tidak ditemukan untuk test ini.');
        }

        // Ambil jawaban draft dari detail_result terkait dengan resultId
        const draftAnswers = await prismaClient.detail_result.findMany({
            where: {
                resultId: result.id,
                status: 'draft', // Ambil hanya jawaban draft
            },
            include: {
                option: true, // Include untuk mendapatkan data option
            },
        });

        if (!draftAnswers || draftAnswers.length === 0) {
            throw new Error('Tidak ada jawaban draft yang ditemukan untuk dikirim.');
        }

        let totalScore = 0;

        // Loop untuk menghitung total skor
        for (const draftAnswer of draftAnswers) {
            const multipleChoice = await prismaClient.multiplechoice.findUnique({
                where: {
                    id: draftAnswer.option.multiplechoiceId,
                },
                include: {
                    option: true, // Include untuk mendapatkan semua opsi terkait
                },
            });

            if (!multipleChoice) {
                console.log(`Soal dengan multipleChoiceId ${draftAnswer.option.multiplechoiceId} tidak ditemukan.`);
                continue; // Lewati iterasi ini jika soal tidak ditemukan
            }

            // Temukan opsi yang benar dari soal tersebut
            const correctOption = multipleChoice.option.find((opt) => opt.isCorrect);

            // Periksa apakah jawaban pengguna benar dengan membandingkan optionId dari jawaban dengan correctOption.id
            if (correctOption && correctOption.id === draftAnswer.optionId) {
                totalScore += multipleChoice.weight; // Tambahkan skor
            }
        }

        // Update skor total untuk result yang ada
        await prismaClient.result.update({
            where: { id: result.id },
            data: { score: totalScore },
        });

        // Ubah status jawaban draft menjadi final untuk result ini
        await prismaClient.detail_result.updateMany({
            where: {
                resultId: result.id,
                status: 'draft',
            },
            data: {
                status: 'final',
            },
        });

        return result;
    } catch (error) {
        throw new Error(`Gagal mengirim jawaban final: ${error.message}`);
    }
};







export const getAnswersByResultId = async (resultId) => {
    try {
        const answers = await prismaClient.detail_result.findMany({
            where: { resultId },
            include: {
                option: true,  // Including the related option details
            },
        });

        return answers;
    } catch (error) {
        console.error('Error fetching answers by result ID:', error.message);
        throw new Error(`Gagal mendapatkan jawaban untuk resultId ${resultId}: ${error.message}`);
    }
};
