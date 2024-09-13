import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'Not authorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'CLETA-REST-API') as { id: string, role: string };
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized, token failed' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user?.role)) {
      res.status(403).json({ error: 'Unauthorized role' });
      return;
    }
    next();
  };
};
