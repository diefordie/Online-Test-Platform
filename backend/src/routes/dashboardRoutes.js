// src/routes/dashboardRoutes.js
import { Router } from 'express'; // Ubah require menjadi import
import * as dashboardController from '../controllers/dashboardController.js'; // Import semua sebagai modul ESM

const router = Router();

// Routes for dashboard services
router.get('/popular-tests', dashboardController.getPopularTests);
router.get('/free-tests', dashboardController.getFreeTests);
router.get('/search-tests', dashboardController.searchTestsByTitle);
router.get('/tests-by-category', dashboardController.getTestsByCategory);
router.get('/popular-tests-by-category', dashboardController.getPopularTestsByCategory);
router.get('/free-tests-by-category', dashboardController.getFreeTestsByCategory);

export default router; // Ganti module.exports dengan export default
