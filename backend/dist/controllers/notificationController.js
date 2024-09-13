import { Notification } from '../models/Notification.js';
// Get all notifications for the logged-in user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user?._id }).sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Mark a notification as read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
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
// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
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
