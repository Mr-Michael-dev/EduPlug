/// <reference types="express" />
// <reference path="../types/express/express.d.ts" />
/// <reference path="../../express.d.ts" />

import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import { fileUploader } from '../utils/upload.js';

export const getActivityHistory = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = await User.findById(req.user?._id).populate('activityHistory.postId');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user.activityHistory);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: 'Server error' });
    } else {
      return res.status(500).json({ error: 'Unknown error occurred' });
    }
  }
};
