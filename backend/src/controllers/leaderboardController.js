const leaderboardService = require('../services/leaderboardService');

class LeaderboardController {
  async getLeaderboard(req, res) {
    try {
      const leaderboard = await leaderboardService.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new LeaderboardController();