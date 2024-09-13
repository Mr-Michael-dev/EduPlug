import { Router } from 'express';
import {
    register,
    login,
    verifyEmail
} from '../controllers/auth.js';
import { protect } from '../middleware/auth.js';
import {getProfile, updateProfile,} from '../controllers/userController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile); 
router.put('/profile', protect, updateProfile);
router.post('/verifyEmail', verifyEmail);

export default router;
