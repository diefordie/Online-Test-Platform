import express from 'express';
import { createUserController } from '../controllers/userControllers.js';

const router = express.Router();

// Endpoint untuk registrasi pengguna
router.post('/users', createUserController);

export default router;








// const express = require("express");
// const { createUser } = require("backend/src/controllers/userControllers.js");

// const router = express.Router();

// router.post("/create-user", createUser);

// module.exports = router;
