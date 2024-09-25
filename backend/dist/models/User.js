import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'contributor', 'user'], default: 'user' },
    profilePic: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    activityHistory: [{
            action: { type: String, enum: ['liked', 'commented', 'viewed'], required: true },
            postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
            timestamp: { type: Date, default: Date.now }
        }],
});
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
export const User = mongoose.model('User', userSchema);
