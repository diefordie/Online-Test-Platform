import express from 'express';
import TestController from '../controllers/detailsoalController.js';

const router = express.Router();
const testController = new TestController();

// Define the endpoint to get test details by testId
router.get('/:testId/detail', async (req, res) => {
  await testController.getTestDetails(req, res);
});

export default router;
