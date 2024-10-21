const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LeaderboardService {
  async getLeaderboard() {
    const leaderboard = await prisma.result.findMany({
      select: {
        user: {
          select: {
            name: true,
          },
        },
        score: true,
        test: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        score: 'desc',
      },
      take: 10, // Limit to top 10 results
    });

    return leaderboard.map((entry, index) => ({
      ranking: index + 1,
      name: entry.user.name,
      score: entry.score,
      testTitle: entry.test.title,
    }));
  }
}

module.exports = new LeaderboardService();