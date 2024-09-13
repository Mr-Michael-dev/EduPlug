import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
// middleware for protecting routes
export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Not authorized' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'CLETA-REST-API');
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};
// middleware for authorizing roles
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            res.status(403).json({ error: 'Unauthorized role' });
            return;
        }
        next();
    };
};
