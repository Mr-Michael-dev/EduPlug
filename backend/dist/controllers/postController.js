import { Post } from '../models/Post.js';
// Create post for contributors
export const createPost = async (req, res) => {
    if (req.user?.role !== 'contributor') {
        res.status(403).json({ error: 'Only contributors can create posts' });
        return; // Return here after sending the response
    }
    const { title, content } = req.body;
    try {
        const post = new Post({ title, content, author: req.user._id });
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Delete post (Admins or post authors can delete)
export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    if (req.user?.role !== 'admin' && post.author.toString() !== req.user?._id.toString()) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
    }
    await post.deleteOne(); // Updated here
    res.json({ message: 'Post deleted' });
};
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const updatePost = async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Visitors can view posts
export const getPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'username').populate('comments');
    res.status(200).json(posts);
};
export const likePost = async (req, res) => {
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
        post.likes = post.likes.filter((user) => user.toString() !== req.user._id.toString());
        await post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
