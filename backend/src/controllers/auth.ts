/// <reference types="express" />
/// <reference path="../../express.d.ts" />


import { Request, Response, NextFunction } from 'express'; 
import { User } from '../models/User.js';
import { generateToken, hashPassword, random } from '../utils/index.js';
import redisClient from '../db/redis.js'; // Redis redisClient
import nodemailer from 'nodemailer'; // For sending verification emails
import { MongoError } from 'mongodb';

interface RequestType {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  token: string;
}

// Register a new user
export const register = async (req: Request<{}, {}, RequestType>, res: Response): Promise<Response> => {
  const { fullname, username, email, password, role } = req.body;

  const lowerCaseEmail = email.toLowerCase()
  console.log(lowerCaseEmail);

  try {
    const hashedPassword = hashPassword(password);

    // Create new user
    const user = new User({ fullname, username, email: lowerCaseEmail, password: hashedPassword, role, isVerified: false });
    await user.save();

    // Generate verification code
    const verificationCode = random();

    // Store verification code in Redis with an expiration time
    await redisClient.set(lowerCaseEmail, verificationCode, 1800);

    const verificationLink = `http://localhost:5173/verify-email?token=${verificationCode}&email=${encodeURIComponent(lowerCaseEmail)}`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center;">
          <img src="./eduplug_logo_1_copy.png" alt="EduPlug Logo" style="width: 150px;"/>
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

    // Send verification email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      from: '"EduPlug" <noreply@example.com>',  // Customize the sender
      to: email,
      subject: 'Verify Your Email',
      html: htmlBody,  // Use the HTML email template
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error: Error | null, info: any) => {
      if (error) {
        console.error('Error sending verification email:', error);
      } else {
        console.log('Verification email sent:', info.response);
      }
    });
    
    return res.status(201).json({ message: 'User registered. Please check your email for verification.' });
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      // Check which field caused the duplicate key error
      if (error.message.includes('email_1')) {
        return res.status(400).json({ error: 'Email already exists' });
      } else if (error.message.includes('username_1')) {
        return res.status(400).json({ error: 'Username already exists' });
      } else {
        return res.status(400).json({ error: 'Duplicate key error' });
      }
    } else if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: 'Unknown error occurred' });
    }
  }
};

// Verify email by either token (link) or code (manual entry)
export const verifyEmail = async (req: Request<{}, {}, RequestType>, res: Response): Promise<Response> => {
  // Extract email and code/token
  const email = req.body.email
  const token = req.body.token

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

    // Get verification code from Redis using the lowercase email
    const verificationCode = await redisClient.get(lowerEmail);
    if (!verificationCode) {
      return res.status(400).json({ error: 'Verification code has expired or is invalid' });
    }

    // Compare provided code with the stored verification code
    if (token !== verificationCode) {
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
      secure: process.env.NODE_ENV === 'production', // Enable secure flag in production
      sameSite: 'strict', // Prevent CSRF
      maxAge: 60 * 60 * 1000, // 1 hour expiration
    });

    return res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


// Login
export const login = async (req: Request<{}, {}, RequestType>, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const lowerCaseEmail = email.toLowerCase()

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
    secure: process.env.NODE_ENV === 'production', // true in production for HTTPS
    sameSite: 'strict', // prevent CSRF
    maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};

// logout controller
export const logout = async (req: Request, res: Response): Promise<Response> => {
  res.clearCookie('token'); // Clear the token cookie
  return res.status(200).send({ message: 'Logged out successfully' });
};

// check authentication for users
export const checkAuth = async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ message: 'Authenticated', user: req.user });
};
