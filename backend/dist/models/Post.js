import mongoose, { Schema } from 'mongoose';
const postSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: { type: [String] },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });
// Create text index for search functionality
postSchema.index({ title: 'text', body: 'text' });
<<<<<<< HEAD
exports.Post = mongoose_1.default.model('Post', postSchema);
//# sourceMappingURL=Post.js.map
=======
export const Post = mongoose.model('Post', postSchema);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
