import express from 'express';
import { protect } from '../middleware/auth'; // Changed to middleware path
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from '../controllers/notificationController';

const router = express.Router();

// Routes for getting all notifications for logged-in users
router.route('/')
  .get(protect, getNotifications); // Protect route so only logged-in users can get notifications

// Route for marking notifications as read
router.route('/:id/read')
  .put(protect, markAsRead); // Protect route for marking notifications as read

// Route for deleting notifications
router.route('/:id')
  .delete(protect, deleteNotification); // Protect route for deleting notifications

export default router;
