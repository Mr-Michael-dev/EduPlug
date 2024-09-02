import { Request, Response } from 'express';
import { Comment, IComment } from '../models/Comment';
import { Post } from '../models/Post';

export const addComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const comment = new Comment({
      body: req.body.body,
      author: req.user._id,
      post: post._id,
    });

    await comment.save();
    post.comments.push(comment._id);
    await post.save();

    res.status(201).json(comment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate('author', 'username');
    res.json(comments);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    if (!req.user || comment.author.toString() !== req.user._id.toString()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    comment.body = req.body.body || comment.body;

    await comment.save();
    res.json(comment);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' });
      return;
    }

    if (!req.user || comment.author.toString() !== req.user._id.toString()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    await comment.deleteOne();
    res.json({ message: 'Comment removed' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
