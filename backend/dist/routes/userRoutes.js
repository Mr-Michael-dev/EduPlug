"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/profile', auth_1.protect, auth_1.getProfile);
router.put('/profile', auth_1.protect, auth_1.updateProfile);
router.post('/verifyEmail', auth_1.verifyEmail);
exports.default = router;
