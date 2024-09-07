import express from 'express';
import { protect } from '../controllers/auth';
import {
  getNotifications,
  markAsRead,
  deleteNotification,
} from '../controllers/notificationController';

const router = express.Router();

router.route('/')
  .get(protect, getNotifications);

router.route('/:id/read')
  .put(protect, markAsRead);

router.route('/:id')
  .delete(protect, deleteNotification);

export default router;
