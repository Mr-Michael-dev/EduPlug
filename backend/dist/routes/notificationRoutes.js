"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth"); // Changed to middleware path
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
// Routes for getting all notifications for logged-in users
router.route('/')
    .get(auth_1.protect, notificationController_1.getNotifications); // Protect route so only logged-in users can get notifications
// Route for marking notifications as read
router.route('/:id/read')
    .put(auth_1.protect, notificationController_1.markAsRead); // Protect route for marking notifications as read
// Route for deleting notifications
router.route('/:id')
    .delete(auth_1.protect, notificationController_1.deleteNotification); // Protect route for deleting notifications
exports.default = router;
