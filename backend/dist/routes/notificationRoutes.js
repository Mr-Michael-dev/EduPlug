"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const notificationController_1 = require("../controllers/notificationController");
const router = express_1.default.Router();
router.route('/')
    .get(auth_1.protect, notificationController_1.getNotifications);
router.route('/:id/read')
    .put(auth_1.protect, notificationController_1.markAsRead);
router.route('/:id')
    .delete(auth_1.protect, notificationController_1.deleteNotification);
exports.default = router;
