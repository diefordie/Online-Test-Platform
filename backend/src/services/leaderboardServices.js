import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTopScoresService = async () => {
  const topScores = await prisma.result.findMany({
    select: {
      id: true,
      score: true,
      user: {
        select: {
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
    name: score.user.name,
    score: score.score,
  }));
};