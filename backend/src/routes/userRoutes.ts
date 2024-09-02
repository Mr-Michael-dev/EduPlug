// src/routes/userRoutes.ts
import express from 'express';
import {
  register,
  login,
  protect,
  getProfile,
  updateProfile,
} from '../controllers/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
