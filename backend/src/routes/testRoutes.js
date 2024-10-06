// routes/testResultRoutes.js
const express = require("express");
const {testResultController} =  require("backend/src/controllers/testControllers.js");

const router = express.Router();

// Rute untuk mengambil hasil tes terbaru user
router.get('/test-result/:userId', testResultController.getTestResult);

module.exports = router;
