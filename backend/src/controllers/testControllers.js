import { createTestService } from '../services/testServices.js'; // Pastikan menggunakan ekstensi .js

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
