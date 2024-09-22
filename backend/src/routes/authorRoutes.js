const express = require("express");
const { createAuthor } = require("../controllers/authorControllers"); // Pastikan import benar

const router = express.Router();

router.post("/create-author", createAuthor);

module.exports = router;