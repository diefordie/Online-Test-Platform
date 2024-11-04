import express from 'express';
import { createMultipleChoice, updateMultipleChoice, getMultipleChoice, getMultipleChoiceById, deleteMultipleChoice, getQuestions, getMultipleChoiceByNumberAndTestId, updateMultipleChoicePageNameController, getPagesByTestIdController } from '../controllers/multiplechoiceController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add-questions', upload.array('questionPhoto'), (req, res) => {
    console.log('Request body:', req.body); 
    if (req.file) {
        req.body.questions.forEach(question => {
            question.questionPhoto = req.file.path; 
        });
    }
    createMultipleChoice(req, res);
});

router.put('/update-question', updateMultipleChoice);
router.put('/update-pageName', updateMultipleChoicePageNameController);

router.get('/questions/:testId', getQuestions);
router.get('/questions/:testId', getMultipleChoice);
router.get('/question/:id', getMultipleChoiceById);
// router.get('/:testId', getQuestions);
router.get('/:testId/:number', getMultipleChoiceByNumberAndTestId);
router.get('/get-pages/:testId', getPagesByTestIdController);
router.delete('/question/:multiplechoiceId', deleteMultipleChoice);

export default router; 