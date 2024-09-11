import { Router } from 'express';
import { cache } from '../models/cache';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController';
import { protect } from '../middleware/auth'; // Changed middleware path

const router = Router();

// Routes for creating a post and getting all posts (with caching)
router.route('/')
  .post(protect, createPost) // Protect route for creating posts
  .get(cache, getPosts); // Use cache middleware for getting posts

// Routes for specific post CRUD operations
router.route('/:id')
  .get(getPostById) // Anyone can get a post
  .put(protect, updatePost) // Protect route for updating posts
  .delete(protect, deletePost); // Protect route for deleting posts

// Route for liking a post
router.route('/:id/like')
  .post(protect, likePost); // Protect route for liking posts

export default router;
