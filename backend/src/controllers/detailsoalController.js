import TestService from '../services/detailsoalService';

class TestController {
  async getTestDetails(req, res) {
    const testId = req.params.testId;
    const testService = new TestService();

    try {
      const testDetails = await testService.getTestDetails(testId);
      res.status(200).json(testDetails);
    } catch (error) {
      res.status(404).json({ error: 'Test not found' });
    }
  }
}

export default TestController;