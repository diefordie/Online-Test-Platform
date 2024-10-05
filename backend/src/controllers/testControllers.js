import { createTestService, getTestService } from '../services/testServices.js'; // Pastikan menggunakan ekstensi .js

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



// const { createTestService } = require("backend/src/services/testServices.js");

// const createTest = async (req, res) => {
//     try {
//         const newTest = req.body;

//         const test = await createTestService(newTest);

//         res.status(201).send({
//             data: test,
//             message: "Create test success",
//         });
//     } catch (error) {
//         res.status(500).send({
//             message: "Failed to create test",
//             error: error.message,
//         });
//     }
// };

// module.exports = { createTest };