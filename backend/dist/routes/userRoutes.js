import { Router } from 'express';
import { register, login, protect, getProfile, updateProfile, verifyEmail } from '../controllers/auth.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/verifyEmail', verifyEmail);
export default router;
