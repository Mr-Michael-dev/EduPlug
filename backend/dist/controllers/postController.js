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
exports.likePost = exports.deletePost = exports.updatePost = exports.getPostById = exports.getPosts = exports.createPost = void 0;
const Post_1 = require("../models/Post");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body, tags } = req.body;
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Not authorized' });
            return;
        }
        const post = new Post_1.Post({
            title,
            body,
            tags,
            author: req.user._id,
        });
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createPost = createPost;
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, tags, page = 1, limit = 10 } = req.query;
    const query = {};
    if (search) {
        query.$text = { $search: search };
    }
    if (tags) {
        query.tags = { $in: tags.split(',') };
    }
    try {
        const posts = yield Post_1.Post.find(query)
            .populate('author', 'username')
            .skip((Number(page) - 1) * Number(limit))
            .limit(Number(limit));
        const totalPosts = yield Post_1.Post.countDocuments(query);
        res.json({ posts, totalPages: Math.ceil(totalPosts / Number(limit)) });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.Post.findById(req.params.id).populate('author', 'username');
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.getPostById = getPostById;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.Post.findById(req.params.id);
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
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ error: 'Post not found' });
            return;
        }
        if (!req.user || post.author.toString() !== req.user._id.toString()) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        yield post.deleteOne();
        res.json({ message: 'Post removed' });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.deletePost = deletePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (!req.user) {
            res.status(401).json({ error: 'Not authorized' });
            return;
        }
        post.likes = post.likes.filter((user) => user.toString() !== req.user._id.toString());
        yield post.save();
        res.json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.likePost = likePost;
