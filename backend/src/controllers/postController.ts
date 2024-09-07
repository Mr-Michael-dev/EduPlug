import { Request, Response } from 'express';
import { Post, IPost } from '../models/Post';
import { User } from '../models/User';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { title, body, tags } = req.body;

  try {
    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    const post = new Post({
      title,
      body,
      tags,
      author: req.user._id,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  const { search, tags, page = 1, limit = 10 } = req.query;
  const query: any = {};

  if (search) {
    query.$text = { $search: search as string };
  }

  if (tags) {
    query.tags = { $in: (tags as string).split(',') };
  }

  try {
    const posts = await Post.find(query)
      .populate('author', 'username')
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    const totalPosts = await Post.countDocuments(query);

    res.json({ posts, totalPages: Math.ceil(totalPosts / Number(limit)) });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (!req.user || post.author.toString() !== req.user._id.toString()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    post.title = req.body.title || post.title;
    post.body = req.body.body || post.body;
    post.tags = req.body.tags || post.tags;

    await post.save();
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    if (!req.user || post.author.toString() !== req.user._id.toString()) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const likePost = async (req: Request, res: Response): Promise<void> => {
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

    if (!req.user) {
      res.status(401).json({ error: 'Not authorized' });
      return;
    }

    post.likes = post.likes.filter((user) => user.toString() !== req.user!._id.toString());


    await post.save();
    res.json(post);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
