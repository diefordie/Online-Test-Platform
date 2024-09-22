const express = require("express");
const { createMultipleChoice } = require("../controllers/multiplechoiceController.js");
const router = express.Router();

// Endpoint untuk menambah soal ke tes
router.post("/add-questions", createMultipleChoice);

module.exports = router;