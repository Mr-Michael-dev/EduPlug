import { Router } from 'express';
import {
    register,
    login,
    logout,
    verifyEmail,
    checkAuth
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import { getProfile, updateProfile, updateProfilePic, deleteProfile, getActivityHistory } from '../controllers/userController.js';

const router = Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/logout', logout);
router.post('/check-auth', protect, checkAuth);
router.get('/profile', protect, getProfile); 
router.put('/profile', protect, updateProfile);
router.put('/profile/profile-pic', protect, updateProfilePic);
router.delete('/profile/:id', protect, deleteProfile);
router.get('/activity', protect, getActivityHistory);

export default router;
