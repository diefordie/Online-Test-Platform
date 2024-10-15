import LeaderboardService from '../services/leaderboardService';

class LeaderboardController {
  async getLeaderboard(req, res) {
    const leaderboardService = new LeaderboardService();

    try {
      const leaderboard = await leaderboardService.getLeaderboard();
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
  }
}

export default LeaderboardController;
