import express from 'express';
import { cache } from '../models/cache';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  likePost,
} from '../controllers/postController';
import { protect } from '../controllers/auth';

const router = express.Router();

router.route('/')
  .post(protect, createPost)
  .get(cache, getPosts);

router.route('/:id')
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like')
  .post(protect, likePost);

export default router;