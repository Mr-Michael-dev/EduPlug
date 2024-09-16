import { Request, Response } from 'express';
import { Notification } from '../models/Notification.js';

// Get all notifications for the logged-in user
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a notification as read
export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || notification.user.toString() !== req.user?._id.toString()) {
      res.status(404).json({ error: 'Notification not found' });
      return;
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a notification
export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification || notification.user.toString() !== req.user?._id.toString()) {
      res.status(404).json({ error: 'Notification not found' });
      return;
    }

    await notification.deleteOne();
    res.json({ message: 'Notification deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
