import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class LeaderboardService {
  async getLeaderboard() {
    const leaderboard = await prisma.leaderboard.findMany({
      orderBy: { totalScore: 'desc' },
      select: {
        id: true,
        name: true,
        correct: true,
        incorrect: true,
        totalScore: true,
        date: true,
      },
    });

    return leaderboard.map((entry, index) => ({
      ranking: index + 1,
      date: entry.date.toISOString().split('T')[0],  // Formatting the date
      name: entry.name,
      correct: entry.correct,
      incorrect: entry.incorrect,
      totalScore: entry.totalScore,
    }));
  }
}

export default LeaderboardService;
