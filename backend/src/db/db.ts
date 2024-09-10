import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'contributor' | 'visitor';
  isVerified: boolean;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'contributor', 'visitor'], default: 'visitor' },
  isVerified: { type: Boolean, default: false },
});

// Password matching method
userSchema.methods.matchPassword = async function (password: string): Promise<Response> {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<IUser>('User', userSchema);
