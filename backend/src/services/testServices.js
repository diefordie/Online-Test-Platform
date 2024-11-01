import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createTestService = async (newTest) => {
    try {
        return await prisma.test.create({
            data: {
                authorId: "cm2vj4sq50001110uzxkv9q97",
                type: newTest.type,
                category: newTest.category,
                title: newTest.title,
                testDescription: newTest.testDescription,
            },
        });
    } catch (error) {
        console.error("Error saat membuat tes:", error);
        throw new Error('Gagal membuat tes');
    }
};

const publishTestService = async (testId, updateData) => {
    try {
        const updatedTest = await prisma.test.update({
            where: { id: testId },
            data: {
                ...updateData,
                isPublished: true, 
            },
        });
        return updatedTest;
    } catch (error) {
        if (error.code === 'P2025') {
            console.error('Gagal mempublish tes: Rekaman tidak ditemukan dengan ID', testId);
        } else {
            console.error('Kesalahan tidak terduga:', error);
        }
        throw error; 
    }
};

const getAllTestsService = async () => {
    return await prisma.test.findMany({
        select: {
            title: true,
            similarity: true
        }
    });
};

const getTestsByCategory = async (category) => {
    return await prisma.test.findMany({
        where: { category },
    });
};

export { 
    createTestService,
    publishTestService,
    getAllTestsService,
    getTestsByCategory
};