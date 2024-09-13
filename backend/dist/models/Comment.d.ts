import mongoose, { Document } from 'mongoose';
export interface IComment extends Document {
    body: string;
    author: mongoose.Schema.Types.ObjectId;
    post: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Comment: mongoose.Model<IComment, {}, {}, {}, mongoose.Document<unknown, {}, IComment> & IComment & {
    _id: mongoose.Types.ObjectId;
}, any>;
