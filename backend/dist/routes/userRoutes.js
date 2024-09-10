"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth"); // Remove getProfile and updateProfile
// You can also re-add them here if you define them in auth.ts
const router = express_1.default.Router();
router.post('/register', auth_1.register);
router.post('/login', auth_1.login);
router.get('/profile', auth_1.protect, auth_1.getProfile); // Add this back if the method is defined
router.put('/profile', auth_1.protect, auth_1.updateProfile); // Add this back if the method is defined
exports.default = router;
