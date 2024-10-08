// controllers/testResultController.js
import { createTestService, getTestService } from '../services/testServices.js'; /
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

const getTest = async (req, res) => {
    try {
        const { id } = req.params; // Ubah testId menjadi id
        console.log('ID Test yang dicari:', id);
        const test = await getTestService(id);

        res.status(200).send({
            data: test,
            message: 'Get test success',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to get test',
            error: error.message,
        });
    }
};

export { createTest , getTest}; // Menggunakan named export

module.exports = {
  testResultController
};
