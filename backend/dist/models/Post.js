import mongoose, { Schema } from 'mongoose';
const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    banner: { type: String, default: '' },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });
// Create text index for search functionality
postSchema.index({ title: 'text', content: 'text', _id: 'text' });
export const Post = mongoose.model('Post', postSchema);
