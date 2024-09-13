import { Router } from 'express';
import { protect } from '../middleware/auth.js'; // Changed to middleware path
import { getNotifications, markAsRead, deleteNotification, } from '../controllers/notificationController.js';
const router = Router();
// Routes for getting all notifications for logged-in users
router.route('/')
    .get(protect, getNotifications); // Protect route so only logged-in users can get notifications
// Route for marking notifications as read
router.route('/:id/read')
    .put(protect, markAsRead); // Protect route for marking notifications as read
// Route for deleting notifications
router.route('/:id')
<<<<<<< HEAD
    .delete(auth_1.protect, notificationController_1.deleteNotification); // Protect route for deleting notifications
exports.default = router;
//# sourceMappingURL=notificationRoutes.js.map
=======
    .delete(protect, deleteNotification); // Protect route for deleting notifications
export default router;
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
