"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const auth_1 = require("../middleware/auth"); // Changed to use middleware for authentication
const router = express_1.default.Router();
// Routes for adding and getting comments for a specific post
router.route('/:id/comments')
    .post(auth_1.protect, commentController_1.addComment) // Protect route so only logged-in users can add comments
    .get(commentController_1.getComments); // Anyone can get comments
// Routes for updating and deleting specific comments
router.route('/comments/:id')
    .put(auth_1.protect, commentController_1.updateComment) // Protect route for updating comments
    .delete(auth_1.protect, commentController_1.deleteComment); // Protect route for deleting comments
exports.default = router;
