import mongoose, { Schema } from 'mongoose';
const notificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
<<<<<<< HEAD
exports.Notification = mongoose_1.default.model('Notification', notificationSchema);
//# sourceMappingURL=Notification.js.map
=======
export const Notification = mongoose.model('Notification', notificationSchema);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
