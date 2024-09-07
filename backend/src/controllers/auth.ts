import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { fullname, username, email, password } = req.body;

  try {
    const user = new User({ fullname, username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
    req.user = (await User.findById(decoded.id).select('-password')) as IUser | undefined;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  res.json(req.user);
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { fullname, username, email, password, profilePicture, bio } = req.body;

  try {
    const user = await User.findById(req.user?._id);

    if (user) {
      user.fullname = fullname || user.fullname;
      user.username = username || user.username;
      user.email = email || user.email;
      user.profilePicture = profilePicture || user.profilePicture;
      user.bio = bio || user.bio;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
