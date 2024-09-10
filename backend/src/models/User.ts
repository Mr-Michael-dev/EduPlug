import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'contributor' | 'visitor';
  isVerified: boolean;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'contributor', 'visitor'], default: 'visitor' },
  isVerified: { type: Boolean, default: false },
});

userSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
  // Your bcrypt password comparison logic here
  return false; // Replace with actual implementation
};

export const User = mongoose.model<IUser>('User', userSchema);
