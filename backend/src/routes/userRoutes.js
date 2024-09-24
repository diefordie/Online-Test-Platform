import express from 'express';
import { registrasi, login } from '../controllers/userControllers.js';

const router = express.Router();

// Endpoint untuk registrasi pengguna
router.post('/registrasi', registrasi);

// Endpoint untuk login pengguna
router.post('/login', login);

export default router;
