import { Router } from 'express';
import {
    register,
    login,
    verifyEmail
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import {getProfile, updateProfile, updateProfilePic} from '../controllers/userController.js';

const router = Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);
router.get('/profile', protect, getProfile); 
router.put('/profile', protect, updateProfile);
router.put('/profile/profile-pic', protect, updateProfilePic);

export default router;
