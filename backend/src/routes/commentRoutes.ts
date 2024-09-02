// src/routes/commentRoutes.ts
import express from 'express';
import {
  addComment,
  getComments,
  updateComment,
  deleteComment,
} from '../controllers/commentController';
import { protect } from '../controllers/auth';

const router = express.Router();

// Define routes with type annotations
router.route('/:id/comments')
  .post(protect, addComment)
  .get(getComments);

router.route('/comments/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

export default router;

