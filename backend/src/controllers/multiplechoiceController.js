import { createMultipleChoiceService } from '../services/multiplechoiceSevice.js';
import { updateMultipleChoiceService } from '../services/multiplechoiceSevice.js';
import { getMultipleChoiceService } from '../services/multiplechoiceSevice.js';
import { getMultipleChoiceByIdService } from '../services/multiplechoiceSevice.js';
import { deleteMultipleChoiceService } from '../services/multiplechoiceSevice.js';


const createMultipleChoice = async (req, res) => {
    try {
        const { testId, questions } = req.body;

        if (!testId || !questions) {
            return res.status(400).send({
                message: 'testId and questions are required',
            });
        }

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

        if (!questionId || !updatedData) {
            return res.status(400).send({
                message: 'questionId and updatedData are required',
            });
        }

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
        const { testId } = req.params;  

        if (!testId) {
            return res.status(400).send({
                message: 'testId is required',
            });
        }

        const multipleChoices = await getMultipleChoiceService(testId);

        if (!multipleChoices || multipleChoices.length === 0) {
            return res.status(404).send({
                message: 'No questions found for this test',
            });
        }

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
        const { number } = req.params;  

        if (!number) {
            return res.status(404).send({
                message: 'Multiple choice question not found',
            });
        }

        const multipleChoice = await getMultipleChoiceByIdService(parseInt(number));

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