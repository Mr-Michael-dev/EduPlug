/// <reference types="express" />
/// <reference path="../types/express/express.d.ts" />

import { Request, Response, NextFunction } from 'express'; 
import { User } from '../models/User.js';

// Get user profile
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Server error' });
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };
  
  // Update user profile
  export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: 'Server error' });
      } else {
        return res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  };
  