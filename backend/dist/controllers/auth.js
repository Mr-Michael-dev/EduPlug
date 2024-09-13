/// <reference types="express" />
<<<<<<< HEAD
/// <reference path="../../express.d.ts" />
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
const protect = async (req, res, next) => {
=======
/// <reference path="../types/express/express.d.ts" />
import { User } from '../models/User.js';
import { generateToken, hashPassword, random } from '../helpers/index.js';
import redisClient from '../db/redis.js'; // Redis redisClient
import nodemailer from 'nodemailer'; // For sending verification emails
import jwt from 'jsonwebtoken';
// Middleware for protecting routes
export const protect = async (req, res, next) => {
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Not authorized' });
        return;
    }
    try {
<<<<<<< HEAD
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || '');
        req.user = await User_1.User.findById(decoded.id).select('-password');
=======
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'CLETA-REST-API');
        req.user = await User.findById(decoded.id).select('-password');
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};
<<<<<<< HEAD
exports.protect = protect;
// Register a new user
const register = async (req, res) => {
=======
// Register a new user
export const register = async (req, res) => {
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
    const { fullname, username, email, password, role } = req.body;
    try {
        const hashedPassword = hashPassword(password);
        // Create new user
<<<<<<< HEAD
        const user = new User_1.User({ fullname, username, email, password: hashedPassword, role, isVerified: false });
=======
        const user = new User({ fullname, username, email, password: hashedPassword, role, isVerified: false });
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        await user.save();
        // Generate verification code
        const verificationCode = random();
        // Store verification code in Redis with an expiration time
        await redisClient.set(email, verificationCode, 900);
        // Send verification email using nodemailer
        const transporter = nodemailer.createTransport({
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
};
<<<<<<< HEAD
exports.register = register;
// Verify email
const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await User_1.User.findOne({ email });
        if (!user || user.isVerified) {
            return res.status(404).json({ error: 'User not found or already verified' });
=======
// Verify email
export const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    try {
        // find user and check if verified
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        }
        if (user.isVerified) {
            return res.status(403).json({ error: 'Email already verified' });
        }
        // get cached code from redis
        const verificationToken = await redisClient.get(email);
        if (!verificationToken) {
            return res.status(404).json({ error: 'Verification code not found' });
        }
        // delete the cached code from redis db
        await redisClient.del(email);
        // verify code
        if (code === verificationToken) {
            user.isVerified = true;
            await user.save();
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
};
<<<<<<< HEAD
exports.verifyEmail = verifyEmail;
// Login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.User.findOne({ email });
=======
// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = generateToken(user._id, user.role);
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
};
<<<<<<< HEAD
exports.login = login;
// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?._id);
=======
// Get user profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user?._id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
};
<<<<<<< HEAD
exports.getProfile = getProfile;
// Update user profile
const updateProfile = async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndUpdate(req.user?._id, req.body, { new: true });
=======
// Update user profile
export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true });
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
};
<<<<<<< HEAD
exports.updateProfile = updateProfile;
//# sourceMappingURL=auth.js.map
=======
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
