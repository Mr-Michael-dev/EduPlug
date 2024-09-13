import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    fullname: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'contributor' | 'visitor';
    isVerified: boolean;
    matchPassword(password: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & {
    _id: mongoose.Types.ObjectId;
}, any>;
