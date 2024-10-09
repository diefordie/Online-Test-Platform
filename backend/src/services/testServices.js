import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fungsi untuk membuat tes baru
const createTestService = async (newTest) => {
    try {
        return await prisma.test.create({
            data: {
                authorId: "cm1z3ear80001btsebyuiqcza",
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
        // Tambahkan isPublish ke data yang akan diperbarui
        const updatedTest = await prisma.test.update({
            where: { id: testId },
            data: {
                ...updateData, // Data yang ingin diupdate
                isPublished: true, // Set kolom isPublish menjadi true
            },
        });
        return updatedTest;
    } catch (error) {
        if (error.code === 'P2025') {
            console.error('Gagal mempublish tes: Rekaman tidak ditemukan dengan ID', testId);
        } else {
            console.error('Kesalahan tidak terduga:', error);
        }
        throw error; // Anda dapat melempar ulang kesalahan untuk penanganan lebih lanjut jika perlu
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