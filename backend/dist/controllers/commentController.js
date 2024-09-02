"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.getComments = exports.addComment = void 0;
const Comment_1 = require("../models/Comment");
const Post_1 = require("../models/Post");
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ error: 'Not authorized' });
            return;
        }
        const comment = new Comment_1.Comment({
            body: req.body.body,
            author: req.user._id,
            post: post._id,
        });
        yield comment.save();
        post.comments.push(comment._id);
        yield post.save();
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.addComment = addComment;
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comments = yield Comment_1.Comment.find({ post: req.params.id }).populate('author', 'username');
        res.json(comments);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getComments = getComments;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.Comment.findById(req.params.id);
        if (!comment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        if (!req.user || comment.author.toString() !== req.user._id.toString()) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        comment.body = req.body.body || comment.body;
        yield comment.save();
        res.json(comment);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield Comment_1.Comment.findById(req.params.id);
        if (!comment) {
            res.status(404).json({ error: 'Comment not found' });
            return;
        }
        if (!req.user || comment.author.toString() !== req.user._id.toString()) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        yield comment.deleteOne();
        res.json({ message: 'Comment removed' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deleteComment = deleteComment;
