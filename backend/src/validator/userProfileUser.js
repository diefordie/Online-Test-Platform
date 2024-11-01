import { body, validationResult } from 'express-validator';

export const validateUserProfile = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('userPhoto').optional().isURL().withMessage('User photo must be a valid URL'),
];

export const validatePasswordChange = [
    // body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
];

// Middleware untuk memeriksa hasil validasi
export const checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};