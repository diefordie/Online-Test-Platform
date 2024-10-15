import { createTestService } from '../services/testServices.js'; // Pastikan menggunakan ekstensi .js
import { getTestDetailById } from '../services/testServices.js';


const createTest = async (req, res) => {
    try {
        const newTest = req.body;

        const test = await createTestService(newTest);

        res.status(201).send({
            data: test,
            message: 'Create test success',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to create test',
            error: error.message,
        });
    }
};

export { createTest }; // Menggunakan named export

export const getTestDetail = async (req, res) => {
    const { testId } = req.params;

    try {
        const test = await getTestDetailById(testId); // Memanggil service untuk mendapatkan detail test

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        res.status(200).json({
            title: test.title,
            similarity: test.similarity,
            price: test.price,
        });
    } catch (error) {
        console.error("Error fetching test detail:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};