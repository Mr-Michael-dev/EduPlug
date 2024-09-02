"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/postRoutes.ts
const express_1 = __importDefault(require("express"));
const cache_1 = require("../cache");
const postController_1 = require("../controllers/postController");
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
router.route('/')
    .post(auth_1.protect, postController_1.createPost)
    .get(cache_1.cache, postController_1.getPosts);
router.route('/:id')
    .get(postController_1.getPostById)
    .put(auth_1.protect, postController_1.updatePost)
    .delete(auth_1.protect, postController_1.deletePost);
router.route('/:id/like')
    .post(auth_1.protect, postController_1.likePost);
exports.default = router;
