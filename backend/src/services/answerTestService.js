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
        decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Gunakan JWT_SECRET dari environment variable
    } catch (error) {
        throw new Error('Token tidak valid atau sudah kadaluarsa');
    }

    // Ambil userId dari token yang sudah ter-decode
    const userId = decodedToken.id;

    // Coba temukan atau buat Result berdasarkan testId dan userId
    let result = await prismaClient.result.findFirst({
        where: {
            testId: testId,
            userId: userId,
        },
    });

    // Jika Result tidak ditemukan, buat Result baru
    if (!result) {
        try {
            result = await prismaClient.result.create({
                data: {
                    testId: testId,
                    userId: userId,
                    score: 0 // Misalnya score awal di-set ke 0
                },
            });
        } catch (error) {
            throw new Error(`Gagal membuat result baru: ${error.message}`);
        }
    }

    // Proses setiap jawaban yang diberikan
    try {
        for (const answer of answers) {
            // Cari jika Detail_result sudah ada
            const existingDetail = await prismaClient.detail_result.findFirst({
                where: {
                    optionId: answer.optionId,
                    resultId: result.id,
                },
            });

            if (existingDetail) {
                // Jika sudah ada, lakukan update
                await prismaClient.detail_result.update({
                    where: {
                        id: existingDetail.id, // Gunakan primary key untuk update
                    },
                    data: {
                        userAnswer: answer.selectedOption,
                        status: 'draft',
                    },
                });
            } else {
                // Jika belum ada, buat entry baru
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
        console.error(`Gagal menyimpan draft jawaban: ${error.message}`);
        throw new Error(`Gagal menyimpan draft jawaban: ${error.message}`);
    }
};


// Fungsi untuk memperbarui jawaban draft
export const updateDraftAnswer = async (resultId, optionId, newAnswer) => {
    try {
        // Cari entri detail_result berdasarkan kombinasi resultId dan optionId
        const existingDetail = await prismaClient.detail_result.findFirst({
            where: {
                resultId: resultId,
                optionId: optionId,
            },
        });

        if (!existingDetail) {
            throw new Error('Draft jawaban tidak ditemukan.');
        }

        // Perbarui entri draft yang ada dengan jawaban baru
        await prismaClient.detail_result.update({
            where: {
                id: existingDetail.id, // Gunakan ID dari entri yang ditemukan
            },
            data: {
                userAnswer: newAnswer, // Perbarui jawaban
            },
        });
    } catch (error) {
        throw new Error(`Gagal memperbarui draft jawaban: ${error.message}`);
    }
};


// Fungsi untuk mengirim jawaban final
export const submitFinalAnswers = async (testId, token) => {
    // Verifikasi token JWT
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Token tidak valid atau sudah kadaluarsa');
    }

    // Dapatkan userId dari token yang ter-decode
    const userId = decodedToken.id;

    try {
        // Ambil semua jawaban draft pengguna untuk testId ini
        const draftAnswers = await prismaClient.detail_result.findMany({
            where: {
                result: {
                    testId,
                    userId,
                },
                status: 'draft',
            },
        });

        // Ubah status semua jawaban draft menjadi final
        await prismaClient.detail_result.updateMany({
            where: {
                result: {
                    testId,
                    userId,
                },
                status: 'draft',
            },
            data: {
                status: 'final', // Ubah status menjadi final
            },
        });

        // Logika perhitungan skor berdasarkan jawaban yang benar
        let totalScore = 0;
        for (const draftAnswer of draftAnswers) {
            // Dapatkan detail pilihan ganda dan opsi terkait
            const multipleChoice = await prismaClient.multiplechoice.findUnique({
                where: { id: draftAnswer.optionId },
                include: { option: true }
            });

            // Temukan opsi yang benar
            const correctOption = multipleChoice.option.find(opt => opt.isCorrect);

            // Jika jawaban benar, tambahkan weight ke total skor
            if (correctOption && correctOption.id === draftAnswer.userAnswer) {
                totalScore += multipleChoice.weight;
            }
        }

        // Buat atau perbarui entri hasil untuk pengguna dan testId ini
        const result = await prismaClient.result.upsert({
            where: {
                userId_testId: {
                    userId,
                    testId,
                },
            },
            update: {
                score: totalScore,
            },
            create: {
                testId,
                userId,
                score: totalScore,
                detail_resultresult: {
                    create: draftAnswers.map(draftAnswer => ({
                        optionId: draftAnswer.optionId,
                        userAnswer: draftAnswer.userAnswer,
                    })),
                },
            },
        });

        return result; // Kembalikan hasil akhir
    } catch (error) {
        throw new Error(`Gagal mengirim jawaban final: ${error.message}`);
    }
};
