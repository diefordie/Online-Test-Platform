import { resultService } from 'backend/src/services/resultService.js';

// Controller untuk mengambil hasil tes berdasarkan userId dan testId
const getTestResultsController = async (req, res) => {
    const { userId, testId } = req.params;

    try {
        const resultData = await resultService.getTestResults(userId, testId);
        res.status(200).json(resultData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTestResultsController,
};
