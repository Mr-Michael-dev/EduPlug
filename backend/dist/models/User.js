<<<<<<< HEAD
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.Schema({
=======
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'contributor', 'visitor'], default: 'visitor' },
    isVerified: { type: Boolean, default: false },
});
userSchema.methods.matchPassword = async function (password) {
<<<<<<< HEAD
    // Your bcrypt password comparison logic here
    return false; // Replace with actual implementation
};
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map
=======
    return bcrypt.compare(password, this.password);
};
export const User = mongoose.model('User', userSchema);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
