import { Router } from 'express';
import {
    register,
    login,
    verifyEmail,
} from '../controllers/auth.js';
import { checkAdminToken } from '../middleware/auth.js';

const router = Router();

router.post('/signup', checkAdminToken, register);
router.post('/verify-email', verifyEmail);
router.post('/login', login);

export default router;