import express from 'express';
import { createAuthor } from '../controllers/authorControllers.js'; // Pastikan menggunakan ekstensi .js

const router = express.Router();

router.post('/create-author', createAuthor);

export default router; // Menggunakan default export




// const express = require("express");
// const { createAuthor } = require("../controllers/authorControllers"); // Pastikan import benar

// const router = express.Router();

// router.post("/create-author", createAuthor);

// module.exports = router;