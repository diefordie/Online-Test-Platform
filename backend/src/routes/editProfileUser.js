import express from 'express';
import { getUserProfile, editUserProfile, changeUserPassword, uploadUserPhoto } from '../controllers/editProfileUser.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { validateUserProfile, validatePasswordChange, checkValidationResult } from '../validator/userProfileUser.js';
import multer from 'multer'; // Impor multer untuk pengunggahan file

const router = express.Router();

// Setup multer untuk meng-upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Path untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Menyimpan dengan nama file unik
  },
});

const upload = multer({ storage });

// Endpoint untuk mendapatkan data profil pengguna
router.get('/profile', authenticateToken, getUserProfile);

// Endpoint untuk memperbarui profil pengguna
router.put('/profile', authenticateToken, upload.single('profileImage'), validateUserProfile, checkValidationResult, (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }
  next();
}, editUserProfile);
  

// Endpoint untuk mengubah kata sandi
router.put('/profile/change-password', authenticateToken, validatePasswordChange, checkValidationResult, changeUserPassword);

router.post('/upload/:id', uploadUserPhoto);
export default router;