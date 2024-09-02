"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/commentRoutes.ts
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
// Define routes with type annotations
router.route('/:id/comments')
    .post(auth_1.protect, commentController_1.addComment)
    .get(commentController_1.getComments);
router.route('/comments/:id')
    .put(auth_1.protect, commentController_1.updateComment)
    .delete(auth_1.protect, commentController_1.deleteComment);
exports.default = router;
