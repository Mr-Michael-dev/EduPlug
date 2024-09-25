import mongoose, { Schema } from 'mongoose';
const commentSchema = new Schema({
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });
export const Comment = mongoose.model('Comment', commentSchema);
