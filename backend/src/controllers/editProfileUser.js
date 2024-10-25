import { getUserById, updateUserProfile, updateUserPassword } from '../services/editProfileUser.js';

export const getUserProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export const editUserProfile = async (req, res) => {
    const userId = req.user.id;
    const { name, email, userPhoto } = req.body; // Ambil nama, email, dan foto dari body

    try {
        const updatedUser = await updateUserProfile(userId, name, email, userPhoto);
        return res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return res.status(400).json({ message: error.message });
    }
};

export const changeUserPassword = async (req, res) => {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    try {
        await updateUserPassword(userId, currentPassword, newPassword);
        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        return res.status(400).json({ message: error.message });
    }
};