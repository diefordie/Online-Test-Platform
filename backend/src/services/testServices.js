import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTestService = async (newTest) => {
    return await prisma.test.create({
        data: {
            authorId: newTest.authorId, 
            category: newTest.category,
            title: newTest.title,
            testDescription: newTest.testDescription,
            price: newTest.price,
            similarity: newTest.similarity,
            worktime: newTest.worktime,
            review: newTest.review,
        },
    });
};

export { createTestService }; // Menggunakan named export

export const getTestDetailById = async (testId) => {
    try {
        const test = await prisma.test.findUnique({
            where: {
                id: testId,
            },
        });

        return test; // Mengembalikan data test jika ditemukan
    } catch (error) {
        console.error("Error fetching test detail from database:", error);
        throw new Error('Database error'); // Melempar kesalahan untuk ditangani di controller
    }
};