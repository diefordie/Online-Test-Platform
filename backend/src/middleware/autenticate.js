// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET || 'your_jwt_secret';

// const authenticateUser = (req, res, next) => {
//     // Untuk testing, set authorId secara manual
//     if (process.env.NODE_ENV === 'test') {
//         req.user = { id: 'dummyAuthorId123' };
//         return next();
//     }

//     const token = req.headers.authorization?.split(' ')[1];
    
//     if (!token) {
//         return res.status(401).send({ message: 'Unauthorized' });
//     }

//     try {
//         const decoded = jwt.verify(token, secret);
//         req.user = { id: decoded.id };
//         next();
//     } catch (error) {
//         res.status(401).send({ message: 'Invalid token' });
//     }
// };

// module.exports = authenticateUser;


// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Mengambil secret dari environment

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Ambil token dari header
    const token = authHeader && authHeader.split(' ')[1]; // Formatnya biasanya "Bearer token"

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const user = jwt.verify(token, secret); // Verifikasi token menggunakan variabel 'secret'
        req.user = user; // Simpan data user yang terverifikasi di request object
        next(); // Lanjutkan ke fungsi berikutnya
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
