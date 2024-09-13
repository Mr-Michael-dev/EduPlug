"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.hashPassword = exports.random = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = process.env.JWT_SECRET || 'CLETA-REST-API';
// Generate random string
const random = () => crypto_1.default.randomBytes(16).toString('hex');
exports.random = random;
// Hash password with salt
const hashPassword = (password) => {
    const salt = bcryptjs_1.default.genSaltSync(10);
    return bcryptjs_1.default.hashSync(password, salt);
};
exports.hashPassword = hashPassword;
// Generate JWT token
const generateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ id: userId, role }, SECRET, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
//# sourceMappingURL=index.js.map