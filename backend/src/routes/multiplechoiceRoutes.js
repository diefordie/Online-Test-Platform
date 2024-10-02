import express from 'express';
import { createMultipleChoice, getMultipleChoice } from '../controllers/multiplechoiceController.js';

const router = express.Router();


// Endpoint untuk menambah soal ke tes
router.post('/add-questions', (req, res) => {
    console.log('Request body:', req.body);  // Debugging log
    createMultipleChoice(req, res);
});

router.put('/update-question', updateMultipleChoice);

router.get('/questions/:testId', getMultipleChoice);
router.get('/question/:questionId', getMultipleChoiceById);

router.delete('/question/:questionId', deleteMultipleChoice);

export default router; // Menggunakan default export





// const express = require("express");
// const { createMultipleChoice } = require("../controllers/multiplechoiceController.js");
// const router = express.Router();

// // Endpoint untuk menambah soal ke tes
// router.post("/add-questions", createMultipleChoice);

// module.exports = router;