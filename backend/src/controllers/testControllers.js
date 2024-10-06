// controllers/testResultController.js
const { getTestResult } = require('backend/src/services/testServices.js'); // Sesuaikan path sesuai struktur folder

const testResultController = {
  getTestResult: async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await getTestResult(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in controller:', error);
      res.status(500).json({ message: error.message });
    }
  },
};


module.exports = {
  testResultController
};
