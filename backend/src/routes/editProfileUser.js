import express from 'express';
import { getUserProfile, editUserProfile, changeUserPassword } from '../controllers/editProfileUser.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateUserProfile, validatePasswordChange, checkValidationResult } from '../validator/editProfileUser.js';

const router = express.Router();

// Endpoint untuk mendapatkan data profil pengguna
router.get('/profile', authenticateToken, getUserProfile);

// Endpoint untuk memperbarui profil pengguna
router.put('/profile', authenticateToken, validateUserProfile, checkValidationResult, editUserProfile);

// Endpoint untuk mengubah kata sandi
router.put('/profile/change-password', authenticateToken, validatePasswordChange, checkValidationResult, changeUserPassword);

export default router;




// // backend/routes/userRoutes.js
// import express from 'express';
// import { body, validationResult } from 'express-validator';
// import multer from 'multer';
// import { authenticateToken } from '../middleware/authenticate.js';
// import { fetchUserProfile, updateUserProfileController } from '../controllers/userController.js';

// const router = express.Router();

// // Setup multer untuk meng-upload gambar
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // Path untuk menyimpan gambar
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Menyimpan dengan nama file unik
//   },
// });

// const upload = multer({ storage });

// // Endpoint untuk mendapatkan profil pengguna
// router.get('/profile', authenticateToken, fetchUserProfile);

// // Endpoint untuk memperbarui profil pengguna
// router.put(
//   '/profile',
//   authenticateToken,
//   upload.single('userPhoto'), // Menggunakan multer untuk upload foto profil
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   },
//   updateUserProfileController
// );

// export default router;
