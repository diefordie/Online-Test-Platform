<<<<<<< HEAD
import express from 'express';
import { createTest, getTest } from '../controllers/testControllers.js';

const router = express.Router();

router.post('/create-test', createTest);
router.get('/get-test/:id', getTest);
=======
const express = require("express");
const { createTestController, fetchTestsByCategory, getAllTests, publishTestController } = require("backend/src/controllers/testControllers.js");

const router = express.Router();

router.post('/tests', createTestController);

router.put('/tests/:testId/publish', publishTestController);

router.get('/category/:category', fetchTestsByCategory);

router.get('/get-test', getAllTests);
>>>>>>> e3cdbf2 (Tambah create dan publish tes)

export default router; // Menggunakan default export



// const express = require("express");
// const { createTest } = require("backend/src/controllers/testControllers.js");

// const router = express.Router();

// router.post("/create-test", createTest);

// module.exports = router;