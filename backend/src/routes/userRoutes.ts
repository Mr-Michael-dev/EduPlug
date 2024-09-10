import express from 'express';
import { register, login, protect, getProfile, updateProfile } from '../controllers/auth'; // Remove getProfile and updateProfile
// You can also re-add them here if you define them in auth.ts

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile); // Add this back if the method is defined
router.put('/profile', protect, updateProfile); // Add this back if the method is defined

export default router;
