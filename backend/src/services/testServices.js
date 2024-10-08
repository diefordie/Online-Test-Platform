// services/testResultService.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

export { createTestService, getTestService }; // Menggunakan named export

