import mongoose, { Document, Schema } from 'mongoose';

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

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: { type: [String] },
  likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

// Create text index for search functionality
postSchema.index({ title: 'text', body: 'text' });

export const Post = mongoose.model<IPost>('Post', postSchema);
