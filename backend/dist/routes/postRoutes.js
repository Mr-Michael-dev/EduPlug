"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cache_1 = require("../models/cache");
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middleware/auth"); // Changed middleware path
const router = (0, express_1.Router)();
// Routes for creating a post and getting all posts (with caching)
router.route('/')
    .post(auth_1.protect, postController_1.createPost) // Protect route for creating posts
    .get(cache_1.cache, postController_1.getPosts); // Use cache middleware for getting posts
// Routes for specific post CRUD operations
router.route('/:id')
    .get(postController_1.getPostById) // Anyone can get a post
    .put(auth_1.protect, postController_1.updatePost) // Protect route for updating posts
    .delete(auth_1.protect, postController_1.deletePost); // Protect route for deleting posts
// Route for liking a post
router.route('/:id/like')
    .post(auth_1.protect, postController_1.likePost); // Protect route for liking posts
exports.default = router;
