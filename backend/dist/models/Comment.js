import mongoose, { Schema } from 'mongoose';
const commentSchema = new Schema({
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });
<<<<<<< HEAD
exports.Comment = mongoose_1.default.model('Comment', commentSchema);
//# sourceMappingURL=Comment.js.map
=======
export const Comment = mongoose.model('Comment', commentSchema);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
