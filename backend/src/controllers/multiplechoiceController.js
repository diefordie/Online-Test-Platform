import { createMultipleChoiceService } from '../services/multiplechoiceSevice.js';
import { updateMultipleChoiceService } from '../services/multiplechoiceSevice.js';
import { getMultipleChoiceService } from '../services/multiplechoiceSevice.js';
import { getMultipleChoiceByIdService } from '../services/multiplechoiceSevice.js';
import { deleteMultipleChoiceService } from '../services/multiplechoiceSevice.js';


const createMultipleChoice = async (req, res) => {
    try {
        const { testId, questions } = req.body;

        // Pastikan testId dan questions dikirimkan
        if (!testId || !questions) {
            return res.status(400).send({
                message: 'testId and questions are required',
            });
        }

        // Panggil service untuk membuat soal beserta opsi
        const multipleChoices = await createMultipleChoiceService(testId, questions);

        res.status(201).send({
            data: multipleChoices,
            message: 'Multiple choice questions created successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to create multiple choice questions',
            error: error.message,
        });
    }
};

export { createMultipleChoice }; 

const updateMultipleChoice = async (req, res) => {
    try {
        const { questionId, updatedData } = req.body;

        // Pastikan questionId dan updatedData dikirimkan
        if (!questionId || !updatedData) {
            return res.status(400).send({
                message: 'questionId and updatedData are required',
            });
        }

        // Panggil service untuk mengupdate soal beserta opsi
        const updatedMultipleChoice = await updateMultipleChoiceService(questionId, updatedData);

        res.status(200).send({
            data: updatedMultipleChoice,
            message: 'Multiple choice question updated successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to update multiple choice question',
            error: error.message,
        });
    }
};

export { updateMultipleChoice };

const getMultipleChoice = async (req, res) => {
    try {
        const { testId } = req.params;  // Ambil testId dari parameter URL

        // Pastikan testId ada
        if (!testId) {
            return res.status(400).send({
                message: 'testId is required',
            });
        }

        // Panggil service untuk mendapatkan soal
        const multipleChoices = await getMultipleChoiceService(testId);

        // Jika tidak ada soal ditemukan
        if (!multipleChoices || multipleChoices.length === 0) {
            return res.status(404).send({
                message: 'No questions found for this test',
            });
        }

        // Kirim response dengan daftar soal
        res.status(200).send({
            data: multipleChoices,
            message: 'Questions fetched successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to fetch questions',
            error: error.message,
        });
    }
};

export { getMultipleChoice };

const getMultipleChoiceById = async (req, res) => {
    try {
        const { questionId } = req.params;  

        if (!questionId) {
            return res.status(404).send({
                message: 'Multiple choice question not found',
            });
        }

        const multipleChoice = await getMultipleChoiceByIdService(questionId);

        if (!multipleChoice) {
            return res.status(404).send({
                message: 'Multiple choice question not found',
            });
        }

        res.status(200).send({
            data: multipleChoice,
            message: 'Multiple choice question retrieved successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to retrieve multiple choice question',
            error: error.message,
        });
    }
};

export { getMultipleChoiceById };

const deleteMultipleChoice = async (req, res) => {
    try {
        const { questionId } = req.params; 

        if (!questionId) {
            return res.status(400).send({
                message: 'Question ID is required',
            });
        }

        await deleteMultipleChoiceService(questionId);

        res.status(200).send({
            message: 'Multiple choice question deleted successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to delete multiple choice question',
            error: error.message,
        });
    }
};

export { deleteMultipleChoice };


// const { createMultipleChoiceService } = require("backend/src/services/multiplechoiceSevice.js");

// const createMultipleChoice = async (req, res) => {
//     try {
//         const { testId, questions } = req.body;

//         // Pastikan testId dan questions dikirimkan
//         if (!testId || !questions) {
//             return res.status(400).send({
//                 message: "testId and questions are required",
//             });
//         }

//         // Panggil service untuk membuat soal beserta opsi
//         const multipleChoices = await createMultipleChoiceService(testId, questions);

//         res.status(201).send({
//             data: multipleChoices,
//             message: "Multiple choice questions created successfully",
//         });
//     } catch (error) {
//         res.status(500).send({
//             message: "Failed to create multiple choice questions",
//             error: error.message,
//         });
//     }
// };

// module.exports = { createMultipleChoice };