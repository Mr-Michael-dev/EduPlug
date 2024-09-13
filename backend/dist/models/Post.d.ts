import mongoose, { Document } from 'mongoose';
export interface IPost extends Document {
    title: string;
    body: string;
    author: mongoose.Schema.Types.ObjectId;
    tags: string[];
    likes: mongoose.Schema.Types.ObjectId[];
    comments: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Post: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost> & IPost & {
    _id: mongoose.Types.ObjectId;
}, any>;
