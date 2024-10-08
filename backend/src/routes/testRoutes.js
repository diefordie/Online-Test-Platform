import express from 'express';
import { createTest, getTest , testResultController} from '../controllers/testControllers.js';
import { testResultController} from '../controllers/testControllers.js'
const express = require("express");

router.post('/create-test', createTest);
router.get('/get-test/:id', getTest);
// routes/testResultRoutes.js


const router = express.Router();

// Rute untuk mengambil hasil tes terbaru user
router.get('/test-result/:userId', testResultController.getTestResult);
module.exports = router;
