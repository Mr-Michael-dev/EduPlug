<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth"); // Remove getProfile and updateProfile
// You can also re-add them here if you define them in auth.ts
const router = (0, express_1.Router)();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/profile', auth_1.protect, auth_1.getProfile); // Add this back if the method is defined
router.put('/profile', auth_1.protect, auth_1.updateProfile); // Add this back if the method is defined
exports.default = router;
//# sourceMappingURL=userRoutes.js.map
=======
import { Router } from 'express';
import { register, login, protect, getProfile, updateProfile, verifyEmail } from '../controllers/auth.js';
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/verifyEmail', verifyEmail);
export default router;
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
