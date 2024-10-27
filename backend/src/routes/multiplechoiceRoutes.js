import express from 'express';
import { createMultipleChoice, updateMultipleChoice, getMultipleChoice, getMultipleChoiceById, deleteMultipleChoice, getQuestions, getMultipleChoiceByNumberAndTestId } from '../controllers/multiplechoiceController.js';

const router = express.Router();
router.get('/questions/:testId', getQuestions);

router.post('/add-questions', (req, res) => {
    console.log('Request body:', req.body); 
    createMultipleChoice(req, res);
});

router.put('/update-question', updateMultipleChoice);

router.get('/questions/:testId', getMultipleChoice);
router.get('/question/:id', getMultipleChoiceById);
router.get('/:testId', getQuestions);
router.get('/:testId/:number/:pageName', getMultipleChoiceByNumberAndTestId);

router.delete('/question/:multiplechoiceId', deleteMultipleChoice);

export default router; 
