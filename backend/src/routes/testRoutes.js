const express = require("express");
const { createTest } = require("backend/src/controllers/testControllers.js");

const router = express.Router();

router.post("/create-test", createTest);

module.exports = router;