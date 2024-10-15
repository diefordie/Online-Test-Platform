import express from 'express';
import { createMultipleChoice } from '../controllers/multiplechoiceController.js';
import { updateMultipleChoice } from '../controllers/multiplechoiceController.js';
import { getMultipleChoice } from '../controllers/multiplechoiceController.js';
import { getMultipleChoiceById } from '../controllers/multiplechoiceController.js';
import { deleteMultipleChoice } from '../controllers/multiplechoiceController.js';
import { getQuestions } from '../controllers/multiplechoiceController.js';
import { getMultipleChoiceIdController } from '../controllers/multiplechoiceController.js';


const router = express.Router();
// Route untuk mendapatkan soal berdasarkan testId
router.get('/questions/:testId', getQuestions);

router.post('/add-questions', (req, res) => {
    console.log('Request body:', req.body);  // Debugging log
    createMultipleChoice(req, res);
});

router.put('/update-question', updateMultipleChoice);

router.get('/questions/:testId', getMultipleChoice);
router.get('/question/:id', getMultipleChoiceById);
router.get('/:testId', getQuestions);
router.get('/multiplechoiceId', getMultipleChoiceIdController);

router.delete('/question/:questionId', deleteMultipleChoice);

export default router; 