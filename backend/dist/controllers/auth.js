"use strict";
/// <reference types="express" />
/// <reference path="../types/express/express.d.ts" />
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.verifyEmail = exports.register = exports.protect = void 0;
const User_1 = require("../models/User");
const helpers_1 = require("../helpers");
const nodemailer_1 = __importDefault(require("nodemailer")); // For sending verification emails
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware for protecting routes
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Not authorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.user = yield User_1.User.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
});
exports.protect = protect;
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, email, password, role } = req.body;
    try {
        const hashedPassword = (0, helpers_1.hashPassword)(password);
        // Create new user
        const user = new User_1.User({ fullname, username, email, password: hashedPassword, role, isVerified: false });
        yield user.save();
        // Generate verification code
        const verificationCode = (0, helpers_1.random)();
        // Send verification email using nodemailer
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        const mailOptions = {
            from: 'noreply@example.com',
            to: email,
            subject: 'Verify Your Email',
            text: `Your email verification code is: ${verificationCode}`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
            }
            else {
                console.log('Verification email sent:', info.response);
            }
        });
        return res.status(201).json({ message: 'User registered. Please check your email for verification.' });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
});
exports.register = register;
// Verify email
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user || user.isVerified) {
            return res.status(404).json({ error: 'User not found or already verified' });
        }
        // Assuming the code was stored (in production, compare with the real one)
        if (code === (0, helpers_1.random)()) {
            user.isVerified = true;
            yield user.save();
            return res.json({ message: 'Email verified successfully' });
        }
        else {
            return res.status(400).json({ error: 'Invalid verification code' });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});
exports.verifyEmail = verifyEmail;
// Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email' });
        }
        const isMatch = yield user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = (0, helpers_1.generateToken)(user._id, user.role);
        return res.status(200).json({ token, user });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});
exports.login = login;
// Get user profile
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.User.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Server error' });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});
exports.getProfile = getProfile;
// Update user profile
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield User_1.User.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: 'Server error' });
        }
        else {
            return res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});
exports.updateProfile = updateProfile;
