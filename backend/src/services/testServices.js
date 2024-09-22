const { PrismaClient } = require("@prisma/client");
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
            review: newTest.review
        },
    });
};

module.exports = { createTestService };