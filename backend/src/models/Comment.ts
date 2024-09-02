// src/models/Comment.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  body: string;
  author: mongoose.Schema.Types.ObjectId;
  post: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
