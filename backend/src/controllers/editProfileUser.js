import path from 'path'; // Import path module
import { 
  getUserById, 
  updateUserProfile, 
  updateUserPassword 
} from '../services/editProfileUser.js';
import { uploadFileToStorage } from '../../firebase/firebaseBucket.js'; // Ensure this is correctly implemented

// Get user profile
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

// Edit user profile
export const editUserProfile = async (req, res) => {
  const userId = req.user.id;
  const { name, email, userPhoto } = req.body;

  try {
    const updatedUser = await updateUserProfile(userId, name, email, userPhoto);
    return res.status(200).json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(400).json({ message: error.message });
  }
};

// Change user password
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

// Upload user photo
export const uploadUserPhoto = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure the user ID comes from req.user for consistency
    const file = req.file; // Ensure Multer is configured to handle file uploads

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const localFilePath = path.resolve(file.path); // Ensure proper file path resolution
    const destination = `profiles/${Date.now()}_${file.originalname}`; // Firebase Storage path

    const url = await uploadFileToStorage(localFilePath, destination);

    return res.status(200).json({ 
      message: 'File uploaded successfully', 
      url 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ error: 'Failed to upload file' });
  }
};
