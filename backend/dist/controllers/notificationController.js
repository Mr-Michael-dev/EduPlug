"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotification = exports.markAsRead = exports.getNotifications = void 0;
const Notification_1 = require("../models/Notification");
// Get all notifications for the logged-in user
const getNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const notifications = yield Notification_1.Notification.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getNotifications = getNotifications;
// Mark a notification as read
const markAsRead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const notification = yield Notification_1.Notification.findById(req.params.id);
        if (!notification || notification.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
            res.status(404).json({ error: 'Notification not found' });
            return;
        }
        notification.isRead = true;
        yield notification.save();
        res.json(notification);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.markAsRead = markAsRead;
// Delete a notification
const deleteNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const notification = yield Notification_1.Notification.findById(req.params.id);
        if (!notification || notification.user.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString())) {
            res.status(404).json({ error: 'Notification not found' });
            return;
        }
        yield notification.deleteOne();
        res.json({ message: 'Notification deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteNotification = deleteNotification;
