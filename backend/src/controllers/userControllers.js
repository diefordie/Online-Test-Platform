import { createUser, loginUser } from '../services/userServices.js';

// Registrasi
export const registrasi = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const { user, token } = await createUser({ name, email, password, role });
        return res.status(201).json({ user, token }); // Return user data and token
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(400).json({ error: error.message });
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { id, name, email: userEmail, role, isApproved, token } = await loginUser({ email, password });
        return res.status(200).json({ id, name, email: userEmail, role, isApproved, token }); // Return user data and token
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(400).json({ error: error.message });
    }
};
