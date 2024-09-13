import mongoose, { Document } from 'mongoose';
export interface INotification extends Document {
    user: mongoose.Schema.Types.ObjectId;
    message: string;
    isRead: boolean;
    createdAt: Date;
}
export declare const Notification: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & {
    _id: mongoose.Types.ObjectId;
}, any>;
