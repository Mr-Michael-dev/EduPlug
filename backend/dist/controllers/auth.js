/// <reference types="express" />
<<<<<<< HEAD
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
const redis_1 = __importDefault(require("../db/redis")); // Redis redisClient
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'CLETA-REST-API');
        req.user = yield User_1.User.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
});
exports.protect = protect;
=======
/// <reference path="../../express.d.ts" />
import { User } from '../models/User.js';
import { generateToken, hashPassword, random } from '../utils/index.js';
import redisClient from '../db/redis.js'; // Redis redisClient
import nodemailer from 'nodemailer'; // For sending verification emails
import { MongoError } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Get __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
>>>>>>> cd32b3d41311f94055d682a69f4e811433c89121
// Register a new user
export const register = async (req, res) => {
    const { fullname, username, email, password, role } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    console.log(lowerCaseEmail);
    try {
        const hashedPassword = hashPassword(password);
        // Create new user
        const user = new User({ fullname, username, email: lowerCaseEmail, password: hashedPassword, role, isVerified: false });
        await user.save();
        // Generate verification code
        const verificationCode = random();
        // Store verification code in Redis with an expiration time
<<<<<<< HEAD
        yield redis_1.default.set(email, verificationCode, 900);
=======
        await redisClient.set(lowerCaseEmail, verificationCode, 1800);
        // Construct the full path to the image in the public folder
        const imageFilePath = path.join(__dirname, '../../public/eduplug_logo_1_copy.png');
        // Convert the image to Base64
        const imageBase64 = fs.readFileSync(imageFilePath, 'base64');
        const base64Logo = `data:image/png;base64,${imageBase64}`;
        const verificationLink = `http://localhost:5173/verify-email?token=${verificationCode}&email=${encodeURIComponent(lowerCaseEmail)}`;
        const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <img src="${base64Logo}" alt="EduPlug Logo" style="width: 150px;"/>
        </div>
        <h2 style="text-align: center;">Welcome to EduPlug!</h2>
        <p>Hi <strong>${fullname}</strong>,</p>
        <p>Thank you for signing up. Please verify your email by using the code below:</p>
        <P><em>code expires in 30 minutes<em></p>
        <h3 style="color: #007bff;">${verificationCode}</h3>
        <p>Alternatively, you can click the following link to verify your email:</p>
        <a href="${verificationLink}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you didn’t sign up, you can ignore this email.</p>
        <br />
        <p>Thanks, <br/> The EduPlug Team</p>
      </div>
    `;
>>>>>>> cd32b3d41311f94055d682a69f4e811433c89121
        // Send verification email using nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        const mailOptions = {
            from: '"EduPlug" <noreply@example.com>',
            to: email,
            subject: 'Verify Your Email',
            html: htmlBody, // Use the HTML email template
        };
        // Send the email
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
        if (error instanceof MongoError && error.code === 11000) {
            // Check which field caused the duplicate key error
            if (error.message.includes('email_1')) {
                return res.status(400).json({ error: 'Email already exists' });
            }
            else if (error.message.includes('username_1')) {
                return res.status(400).json({ error: 'Username already exists' });
            }
            else {
                return res.status(400).json({ error: 'Duplicate key error' });
            }
        }
        else if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};
// Verify email by either token (link) or code (manual entry)
export const verifyEmail = async (req, res) => {
    // Extract email and code/token
    const email = req.body.email;
    const token = req.body.token;
    // Ensure both email and token are provided
    if (!email || !token) {
        return res.status(400).json({ error: 'Email and token are required' });
    }
    // Lowercase email to ensure consistency
    const lowerEmail = typeof email === 'string' ? email.toLowerCase() : '';
    if (!lowerEmail) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    try {
        // Find the user by email
        const user = await User.findOne({ email: lowerEmail });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // If user is already verified, return an error
        if (user.isVerified) {
            return res.status(403).json({ error: 'Email already verified' });
        }
<<<<<<< HEAD
        // get cached code from redis
        const verificationToken = yield redis_1.default.get(email);
        if (!verificationToken) {
            return res.status(404).json({ error: 'Verification code not found' });
        }
        // delete the cached code from redis db
        yield redis_1.default.del(email);
        // verify code
        if (code === verificationToken) {
            user.isVerified = true;
            yield user.save();
            return res.json({ message: 'Email verified successfully' });
        }
        else {
=======
        // Get verification code from Redis using the lowercase email
        const verificationCode = await redisClient.get(lowerEmail);
        if (!verificationCode) {
            return res.status(400).json({ error: 'Verification code has expired or is invalid' });
        }
        // Compare provided code with the stored verification code
        if (token !== verificationCode) {
>>>>>>> cd32b3d41311f94055d682a69f4e811433c89121
            return res.status(400).json({ error: 'Invalid verification code' });
        }
        // Mark the user as verified
        user.isVerified = true;
        await user.save();
        // Delete the verification code from Redis
        await redisClient.del(lowerEmail);
        // Generate session token for the user
        const sessionToken = generateToken(user._id, user.role);
        // Send the JWT in an HTTP-only cookie
        res.cookie('token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour expiration
        });
        return res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    try {
        const user = await User.findOne({ email: lowerCaseEmail }).select('+password');
        if (!user) {
            return res.status(404).json({ error: 'Invalid login credentials' });
        }
        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email' });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid login credentials' });
        }
        const token = generateToken(user._id, user.role);
        // Send JWT in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
        });
        return res.status(200).json({ message: 'Login successful' });
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
// logout controller
export const logout = async (req, res) => {
    res.clearCookie('token'); // Clear the token cookie
    return res.status(200).send({ message: 'Logged out successfully' });
};
// check authentication for users
export const checkAuth = async (req, res) => {
    if (req.user) {
        const baseUrl = `${req.protocol}://${req.get('host')}`;
        const profilePicUrl = req.user.profilePic ? `${baseUrl}${req.user.profilePic}` : null;
        // Return the user object with full profilePic URL
        return res.status(200).json({
            message: 'Authenticated',
            user: {
                ...req.user.toObject(),
                profilePic: profilePicUrl // Ensure full URL is returned
            }
        });
    }
    return res.status(401).json({ message: 'Not authenticated' });
};
