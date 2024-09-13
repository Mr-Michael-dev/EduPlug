<<<<<<< HEAD
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const protect = async (req, res, next) => {
=======
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
export const protect = async (req, res, next) => {
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
    let token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ error: 'Not authorized' });
        return;
    }
    try {
<<<<<<< HEAD
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'CLETA-REST-API');
        req.user = await User_1.User.findById(decoded.id).select('-password');
=======
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'CLETA-REST-API');
        req.user = await User.findById(decoded.id).select('-password');
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};
<<<<<<< HEAD
exports.protect = protect;
const authorizeRoles = (...roles) => {
=======
export const authorizeRoles = (...roles) => {
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
    return (req, res, next) => {
        if (!roles.includes(req.user?.role)) {
            res.status(403).json({ error: 'Unauthorized role' });
            return;
        }
        next();
    };
};
<<<<<<< HEAD
exports.authorizeRoles = authorizeRoles;
//# sourceMappingURL=auth.js.map
=======
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
