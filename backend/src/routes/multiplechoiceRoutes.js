import express from 'express';
import { createMultipleChoice, updateMultipleChoice, getMultipleChoice, getMultipleChoiceById, deleteMultipleChoice, getQuestions, getMultipleChoiceByNumberAndTestId, updateMultipleChoicePageNameController, getPagesByTestIdController } from '../controllers/multiplechoiceController.js';

const router = express.Router();
router.get('/questions/:testId', getQuestions);

router.post('/add-questions', (req, res) => {
    console.log('Request body:', req.body); 
    createMultipleChoice(req, res);
});

router.put('/update-question', updateMultipleChoice);

router.get('/questions/:testId', getMultipleChoice);
router.get('/question/:id', getMultipleChoiceById);
// router.get('/:testId', getQuestions);
router.get('/:testId/:number', getMultipleChoiceByNumberAndTestId);
router.get('/get-pages/:testId', getPagesByTestIdController);
router.put('/update-pageName', updateMultipleChoicePageNameController);
router.delete('/question/:multiplechoiceId', deleteMultipleChoice);

export default router; 