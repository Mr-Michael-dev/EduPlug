import { Router } from 'express';
import {
    register,
    login,
    logout,
    verifyEmail,
    checkAuth,  // Added checkAuth function to verify auth
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import {getProfile, updateProfile, updateProfilePic, deleteProfile} from '../controllers/userController.js';

const router = Router();

router.post('/signup', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.post('/check-auth', protect, checkAuth);
router.get('/profile', protect, getProfile); 
router.put('/profile', protect, updateProfile);
router.put('/profile/profile-pic', protect, updateProfilePic);
router.delete('/profile/:id', protect, deleteProfile); 

export default router;
