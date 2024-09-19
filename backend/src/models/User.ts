import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'contributor' | 'visitor';
  profilePic: string | null;
  isVerified: boolean;
  activityHistory: Array<{ action: string; postId: mongoose.Types.ObjectId; timestamp: Date }>;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'contributor', 'visitor'], default: 'visitor' },
  profilePic: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  activityHistory: [{
    action: { type: String, enum: ['liked', 'commented', 'viewed'], required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    timestamp: { type: Date, default: Date.now }
  }],
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
