<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.getPosts = exports.updatePost = exports.getPostById = exports.deletePost = exports.createPost = void 0;
const Post_1 = require("../models/Post");
// Create post for contributors
const createPost = async (req, res) => {
=======
import { Post } from '../models/Post.js';
// Create post for contributors
export const createPost = async (req, res) => {
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
    if (req.user?.role !== 'contributor') {
        res.status(403).json({ error: 'Only contributors can create posts' });
        return; // Return here after sending the response
    }
    const { title, content } = req.body;
    try {
<<<<<<< HEAD
        const post = new Post_1.Post({ title, content, author: req.user._id });
=======
        const post = new Post({ title, content, author: req.user._id });
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        await post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
<<<<<<< HEAD
exports.createPost = createPost;
// Delete post (Admins or post authors can delete)
const deletePost = async (req, res) => {
    const post = await Post_1.Post.findById(req.params.id);
=======
// Delete post (Admins or post authors can delete)
export const deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.deletePost = deletePost;
const getPostById = async (req, res) => {
    try {
        const post = await Post_1.Post.findById(req.params.id).populate('author', 'username');
=======
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username');
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.getPostById = getPostById;
const updatePost = async (req, res) => {
    try {
        const post = await Post_1.Post.findById(req.params.id);
=======
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.updatePost = updatePost;
// Visitors can view posts
const getPosts = async (req, res) => {
    const posts = await Post_1.Post.find().populate('author', 'username').populate('comments');
    res.status(200).json(posts);
};
exports.getPosts = getPosts;
const likePost = async (req, res) => {
    try {
        const post = await Post_1.Post.findById(req.params.id);
=======
// Visitors can view posts
export const getPosts = async (req, res) => {
    const posts = await Post.find().populate('author', 'username').populate('comments');
    res.status(200).json(posts);
};
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.likePost = likePost;
//# sourceMappingURL=postController.js.map
=======
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
