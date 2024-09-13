"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAsRead = exports.getNotifications = void 0;
const Notification_1 = require("../models/Notification");
// Get all notifications for the logged-in user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.Notification.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getNotifications = getNotifications;
// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification_1.Notification.findById(req.params.id);
        if (!notification || notification.user.toString() !== req.user?._id.toString()) {
            res.status(404).json({ error: 'Notification not found' });
            return;
        }
        notification.isRead = true;
        await notification.save();
        res.json(notification);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.markAsRead = markAsRead;
// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification_1.Notification.findById(req.params.id);
        if (!notification || notification.user.toString() !== req.user?._id.toString()) {
            res.status(404).json({ error: 'Notification not found' });
            return;
        }
        await notification.deleteOne();
        res.json({ message: 'Notification deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationController.js.map