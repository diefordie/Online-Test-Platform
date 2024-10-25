import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTopScoresService = async (testId) => {
  const topScores = await prisma.result.findMany({
    where: {
      testId: testId,
    },
    select: {
      id: true,
      score: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      score: 'desc',
    },
    take: 10, // Limit to top 10 scores
  });

  return topScores.map((score, index) => ({
    ranking: index + 1,
    userId: score.user.id,
    name: score.user.name,
    score: score.score,
  }));
};
