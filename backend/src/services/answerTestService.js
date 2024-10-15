import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prismaClient = new PrismaClient();

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
        result = await prismaClient.result.findFirst({
            where: { testId, userId },
        });
        if (!result) {
            result = await prismaClient.result.create({
                data: { testId, userId, score: 0 },
            });
        }
    } catch (error) {
        console.error('Error fetching or creating result:', error.message);
        throw new Error(`Gagal membuat result baru: ${error.message}`);
    }

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
                await prismaClient.detail_result.update({
                    where: { id: existingDetail.id },
                    data: {
                        userAnswer: answer.selectedOption,
                        status: 'draft',
                    },
                });
            } else {
                await prismaClient.detail_result.create({
                    data: {
                        optionId: answer.optionId,
                        resultId: result.id,
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

        const updatedDetail = await prismaClient.detail_result.update({
            where: { id: existingDetail.id },
            data: {
                optionId: newOptionId,
                userAnswer: newAnswer,
                status: 'draft',
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
        // Ambil jawaban draft dari detail_result berdasarkan testId dan userId
        const draftAnswers = await prismaClient.detail_result.findMany({
            where: {
                result: {
                    testId,
                    userId,
                },
                status: 'draft',
            },
            include: {
                option: true, // Include untuk mendapatkan data option
            },
        });

        // Ubah status draft menjadi final
        await prismaClient.detail_result.updateMany({
            where: {
                result: {
                    testId,
                    userId,
                },
                status: 'draft',
            },
            data: {
                status: 'final',
            },
        });

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
                throw new Error(`Soal dengan multipleChoiceId ${draftAnswer.option.multiplechoiceId} tidak ditemukan.`);
            }
        
            // Temukan opsi yang benar dari soal tersebut
            const correctOption = multipleChoice.option.find((opt) => opt.isCorrect);
        
            // Periksa apakah jawaban pengguna benar dengan membandingkan optionId dari jawaban dengan correctOption.id
            if (correctOption && correctOption.id === draftAnswer.optionId) {
                totalScore += multipleChoice.weight;
            }
        }

        // Perbarui atau buat entri di tabel `result` dengan skor total
        const result = await prismaClient.result.findFirst({
            where: {
                userId: userId,
                testId: testId,
            },
        });
        
        if (result) {
            // Jika result ditemukan, update skor
            const updatedResult = await prismaClient.result.update({
                where: { id: result.id },
                data: {
                    score: totalScore,
                },
            });
            return updatedResult;
        } else {
            // Jika result tidak ditemukan, buat entri baru
            const newResult = await prismaClient.result.create({
                data: {
                    testId: testId,
                    userId: userId,
                    score: totalScore,
                    detail_result: {
                        create: draftAnswers.map((draftAnswer) => ({
                            optionId: draftAnswer.optionId,
                            userAnswer: draftAnswer.userAnswer,
                            status: 'final',
                        })),
                    },
                },
            });
            return newResult;
        }
        

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