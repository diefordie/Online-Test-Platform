import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTopScores = async (req, res) => {
  try {
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

    const formattedTopScores = topScores.map((score, index) => ({
      ranking: index + 1,
      name: score.user.name,
      score: score.score,
    }));

    res.status(200).json(formattedTopScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch top scores' });
  }
};