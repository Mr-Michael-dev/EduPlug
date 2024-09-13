/// <reference types="express" />
/// <reference path="../types/express/express.d.ts" />
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
// Verify email
export const verifyEmail = async (req, res) => {
    const { email, code } = req.body;
    try {
        // find user and check if verified
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
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
// Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
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
