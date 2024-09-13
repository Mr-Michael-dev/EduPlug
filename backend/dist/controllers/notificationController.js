<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAsRead = exports.getNotifications = void 0;
const Notification_1 = require("../models/Notification");
// Get all notifications for the logged-in user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.Notification.find({ user: req.user?._id }).sort({ createdAt: -1 });
=======
import { Notification } from '../models/Notification.js';
// Get all notifications for the logged-in user
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user?._id }).sort({ createdAt: -1 });
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
<<<<<<< HEAD
exports.getNotifications = getNotifications;
// Mark a notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification_1.Notification.findById(req.params.id);
=======
// Mark a notification as read
export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.markAsRead = markAsRead;
// Delete a notification
const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification_1.Notification.findById(req.params.id);
=======
// Delete a notification
export const deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.deleteNotification = deleteNotification;
//# sourceMappingURL=notificationController.js.map
=======
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
