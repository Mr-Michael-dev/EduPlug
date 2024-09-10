import { Request, Response } from 'express';
import { Post } from '../models/Post';

// Create post for contributors
export const createPost = async (req: Request, res: Response): Promise<void> => {
  if (req.user?.role !== 'contributor') {
    return res.status(403).json({ error: 'Only contributors can create posts' });
  }

  const { title, content } = req.body;
  try {
    const post = new Post({ title, content, author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admins or post authors can delete
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (req.user?.role !== 'admin' && post.author.toString() !== req.user?._id.toString()) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  await post.remove();
  res.json({ message: 'Post deleted' });
};

// Visitors can view posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const posts = await Post.find().populate('author', 'username').populate('comments');
  res.status(200).json(posts);
};
