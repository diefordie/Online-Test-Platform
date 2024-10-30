import express from 'express';
import { createTest, getTest, testResultController, createTestController, publishTestController, getAllTests, fetchTestsByCategory, getTestDetail } from '../controllers/testControllers.js';

const router = express.Router();

router.post('/create-test', createTest);
router.get('/get-test/:id', getTest);
router.get('/test-result/:resultId', testResultController);
router.get('/test-detail/:testId', getTestDetail);

router.post('/tests', createTestController);

router.put('/tests/:testId/publish', publishTestController);

router.get('/category/:category', fetchTestsByCategory);

router.get('/get-test', getAllTests);


export default router; // Menggunakan default export



// const express = require("express");
// const { createTest } = require("backend/src/controllers/testControllers.js");

// const router = express.Router();

// router.post("/create-test", createTest);

// module.exports = router;