import prismaClient from '../../prisma/prismaClient.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here'; // Gunakan nilai dari env atau fallback

// Fungsi untuk mengambil tes berdasarkan ID
export const getTestById = async (testId) => {
    try {
        return await prismaClient.test.findUnique({
            where: { id: testId },
            include: {
                author: true,
                multiplechoice: {
                    include: {
                        option: true,
                    },
                },
            },
        });
    } catch (error) {
        throw new Error(`Gagal mengambil test dengan ID ${testId}: ${error.message}`);
    }
};

// Fungsi untuk menyimpan jawaban dari user
export const submitAnswers = async (testId, token, answers) => {
    // Validasi input
    if (!testId || !answers || !Array.isArray(answers)) {
        throw new Error('Data input tidak valid');
    }

    // Verifikasi token JWT
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET); // Verifikasi token JWT
    } catch (error) {
        throw new Error('Token tidak valid atau sudah kadaluarsa');
    }

    // Dapatkan userId dari token yang ter-decode
    const userId = decodedToken.id;

    // Validasi format jawaban
    for (const answer of answers) {
        if (!answer.multiplechoiceId || !answer.selectedOption) {
            throw new Error('Setiap jawaban harus memiliki multiplechoiceId dan selectedOption.');
        }

        // Verifikasi apakah soal multiplechoiceId ada di tes ini
        const multipleChoice = await prismaClient.multiplechoice.findUnique({
            where: { id: answer.multiplechoiceId },
        });

        if (!multipleChoice) {
            throw new Error(`Soal pilihan ganda dengan ID ${answer.multiplechoiceId} tidak ditemukan`);
        }
    }

    try {
        // Logika perhitungan skor berdasarkan jawaban yang benar
        let totalScore = 0;
        for (const answer of answers) {
            const multipleChoice = await prismaClient.multiplechoice.findUnique({
                where: { id: answer.multiplechoiceId },
                include: { option: true } // Sertakan opsi untuk mendapatkan jawaban benar
            });

            // Temukan opsi yang benar
            const correctOption = multipleChoice.option.find(opt => opt.isCorrect);

            if (correctOption && correctOption.id === answer.selectedOption) {
                totalScore += multipleChoice.weight; // Tambahkan weight ke total skor
            }
        }

        // Simpan hasil ke database
        const result = await prismaClient.result.create({
            data: {
                testId,
                userId,
                score: totalScore, // Simpan skor yang dihitung
                detail_resultresult: {
                    create: answers.map(answer => ({
                        optionId: answer.selectedOption,
                        userAnswer: answer.selectedOption,
                    })),
                },
            },
        });

        return result;
    } catch (error) {
        throw new Error(`Gagal menyimpan jawaban: ${error.message}`);
    }
};