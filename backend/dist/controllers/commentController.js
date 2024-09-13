<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComments = exports.addComment = void 0;
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const addComment = async (req, res) => {
    try {
        const post = await Post_1.Post.findById(req.params.id);
=======
import { Comment } from '../models/Comment.js';
import { Post } from '../models/Post.js';
export const addComment = async (req, res) => {
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
        const comment = new Comment({
            body: req.body.body,
            author: req.user._id,
            post: post._id,
        });
        await comment.save();
        post.comments.push(comment._id);
        await post.save();
        res.status(201).json(comment);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
<<<<<<< HEAD
exports.addComment = addComment;
// Get comments for a post
const getComments = async (req, res) => {
    try {
        const comments = await Comment_1.Comment.find({ post: req.params.id }).populate('author', 'username');
=======
// Get comments for a post
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.id }).populate('author', 'username');
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
        res.json(comments);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
<<<<<<< HEAD
exports.getComments = getComments;
// Update a comment
const updateComment = async (req, res) => {
    try {
        const comment = await Comment_1.Comment.findById(req.params.id);
=======
// Update a comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
<<<<<<< HEAD
exports.updateComment = updateComment;
// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment_1.Comment.findById(req.params.id);
=======
// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
<<<<<<< HEAD
exports.deleteComment = deleteComment;
//# sourceMappingURL=commentController.js.map
=======
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
