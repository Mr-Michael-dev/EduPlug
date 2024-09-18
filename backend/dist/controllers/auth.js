/// <reference types="express" />
/// <reference path="../../express.d.ts" />
import { User } from '../models/User.js';
import { generateToken, hashPassword, random } from '../utils/index.js';
import redisClient from '../db/redis.js'; // Redis redisClient
import nodemailer from 'nodemailer'; // For sending verification emails
// Register a new user
export const register = async (req, res) => {
    const { fullname, username, email, password, role } = req.body;
    try {
        const hashedPassword = hashPassword(password);
        // Create new user
        const user = new User({ fullname, username, email, password: hashedPassword, role, isVerified: false });
        await user.save();
        // Generate verification code
        const verificationCode = random();
        // Store verification code in Redis with an expiration time
        await redisClient.set(email, verificationCode, 900);
        const verificationLink = `http://localhost:5173/verify-email?token=${verificationCode}`;
        const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <img src="../../../michael_frontend_backup/src/assets/eduplug_logo_1_copy.png" alt="EduPlug Logo" style="width: 150px;"/>
        </div>
        <h2 style="text-align: center;">Welcome to EduPlug!</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Thank you for signing up. Please verify your email by using the code below:</p>
        <h3 style="color: #007bff;">${verificationCode}</h3>
        <p>You can also click the link below to verify your email:</p>
        <a href="${verificationLink}" style="background-color: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p>If you didn’t sign up, you can ignore this email.</p>
        <br />
        <p>Thanks, <br/> The EduPlug Team</p>
      </div>
    `;
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
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
        else {
            return res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};
// Verify email by either token (link) or code (manual entry)
export const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    const token = req.query.token;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.isVerified) {
            return res.status(403).json({ error: 'Email already verified' });
        }
        const verificationCode = await redisClient.get(email);
        if (token) {
            if (token !== verificationCode) {
                return res.status(400).json({ error: 'Invalid verification token' });
            }
        }
        else if (code) {
            if (code !== verificationCode) {
                return res.status(400).json({ error: 'Invalid verification code' });
            }
        }
        else {
            return res.status(400).json({ error: 'Verification failed. Code or token required' });
        }
        // Mark the user as verified
        user.isVerified = true;
        await user.save();
        await redisClient.del(email);
        const sessionToken = generateToken(user._id, user.role);
        // Send JWT in an HTTP-only cookie
        res.cookie('token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000, // 1 hour
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
    try {
        const user = await User.findOne({ email }).select('+password');
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
    return res.status(200).json({ message: 'Authenticated', user: req.user });
};
