import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Mengambil hasil tes
const getTestResults = async (userId, testId) => {
    try {
        const result = await prisma.result.findUnique({
            where: { userId_testId: { userId, testId } },
            include: { detail_resultresult: true }, 
        });

        if (!result) {
            throw new Error('Hasil tes tidak ditemukan');
        }

        let correctAnswers = 0;
        let wrongAnswers = 0;

        for (const detail of result.detail_resultresult) {
            const option = await prismaClient.option.findUnique({
                where: { id: detail.userAnswer }
            });

            if (option.isCorrect) {
                correctAnswers++;
            } else {
                wrongAnswers++;
            }
        }

        return {
            id: result.id,
            testId: result.testId,
            userId: result.userId,
            score: result.score,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            submissionDate: result.createdAt, 
        };
    } catch (error) {
        throw new Error(`Gagal mengambil hasil tes: ${error.message}`);
    }
};

module.exports = {
    getTestResults,
};


