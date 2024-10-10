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

const getTestService = async (testId) => {     
    return await prisma.test.findUnique({
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
}

const getTestResult = async (userId) => {
    try {
        const latestTestResult = await prisma.result.findFirst({
        where: { userId },
        select: {
            score: true, 
            user: {
            select: { name: true },
            },
          test: {
            select: {
              title: true,
              multiplechoice: {
                select: {
                  question: true,
                },
              },
            },
          },
        },
      });
  
      return {
        score: latestTestResult.score,
        userName: latestTestResult.user.name,
        testTitle: latestTestResult.test.title,
      };
    } catch (error) {
      console.error('Error fetching test result:', error);
      throw new Error('Failed to fetch test result');
    }
  };

export { createTestService, getTestService, getTestResult }; // Menggunakan named export

