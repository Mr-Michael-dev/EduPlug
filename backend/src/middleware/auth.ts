import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';

// middleware for protecting routes
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
  const token = req.cookies.token; // get token from cookies
  
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

// middleware for authorizing roles
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!roles.includes(req.user?.role)) {
      res.status(403).json({ error: 'Unauthorized role' });
      return;
    }
    next();
  };
};

export const checkAdminToken = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.body;  // Get token from the request body

  if (token === process.env.ADMIN_REGISTRATION_TOKEN) {
    next();  // Proceed if the token matches
  } else {
    res.status(403).json({ message: "Forbidden: Invalid admin token" });  // Block access if token is incorrect
  }
};


