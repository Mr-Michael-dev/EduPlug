import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'CLETA-REST-API';
// Generate random string
export const random = () => crypto.randomBytes(16).toString('hex');
// Hash password with salt
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};
// Generate JWT token
export const generateToken = (userId, role) => {
    return jwt.sign({ id: userId, role }, SECRET, { expiresIn: '1h' });
};
<<<<<<< HEAD
exports.generateToken = generateToken;
//# sourceMappingURL=index.js.map
=======
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
