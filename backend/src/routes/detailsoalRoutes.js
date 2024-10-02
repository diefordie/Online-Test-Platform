import NextApiRequest from 'next-api-request';
import TestController from '../../controllers/detailsoalController';

const testController = new TestController();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await testController.getTestDetails(req, res);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}