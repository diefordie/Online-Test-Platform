const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Fungsi untuk membuat tes baru
const createTestService = async (newTest) => {
    try {
        return await prisma.test.create({
            data: {
                authorId: "cm1yhu3600001lxdxnpm9t9k7",
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
        console.log('Updating test with ID:', testId);
        console.log('Update data:', updateData); // Cek data yang akan diperbarui

        return await prisma.test.update({
            where: { id: testId },
            data: {
                price: updateData.price,
                similarity: updateData.similarity,
                worktime: updateData.worktime,
                isPublished: true
            },
        });
    } catch (error) {
        console.error('Error during update:', error); // Cek error yang terjadi
        throw new Error('Gagal mempublish tes');
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

module.exports = { 
    createTestService,
    publishTestService,
    getAllTestsService,
    getTestsByCategory
};