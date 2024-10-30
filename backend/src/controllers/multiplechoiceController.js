import { createMultipleChoiceService, updateMultipleChoiceService, getMultipleChoiceService, getMultipleChoiceByIdService, deleteMultipleChoiceService, getQuestionsByTestId, fetchMultipleChoiceByNumberAndTestId } from '../services/multiplechoiceSevice.js';

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
        const { id } = req.params;  
        const multipleChoice = await getMultipleChoiceByIdService(id);
        console.log("Multiple choice fetched:", multipleChoice);
        res.status(200).json(multipleChoice);
    } catch (error) {
        console.error("Error fetching multiple choice:", error.message);
        res.status(404).json({ error: error.message });
    }
};

export { getMultipleChoiceById };

const deleteMultipleChoice = async (req, res) => {
    try {
        const { multiplechoiceId } = req.params; 

        if (!multiplechoiceId) {
            return res.status(400).send({
                message: 'multiplechoiceId is required',
            });
        }

        await deleteMultipleChoiceService(multiplechoiceId);

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

const getQuestions = async (req, res) => {
    const { testId } = req.params; 
    try {
        const questions = await getQuestionsByTestId(testId);
        if (questions.length === 0) {
            return res.status(404).json({ message: 'Questions not found.' });
        }
        res.status(200).json(questions); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getQuestions };


const getMultipleChoiceByNumberAndTestId = async (req, res) => {
    const { testId, number } = req.params;

    try {
        const multipleChoice = await fetchMultipleChoiceByNumberAndTestId(testId, parseInt(number));

        if (!multipleChoice) {
            return res.status(404).json({ message: 'Multiplechoice not found' });
        }

        return res.json(multipleChoice);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export{
    getMultipleChoiceByNumberAndTestId,
};

