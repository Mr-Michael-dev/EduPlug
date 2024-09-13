import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'contributor', 'visitor'], default: 'visitor' },
    profilePic: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
});
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
export const User = mongoose.model('User', userSchema);
