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
exports.getPosts = exports.deletePost = exports.createPost = void 0;
const Post_1 = require("../models/Post");
// Create post for contributors
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'contributor') {
        return res.status(403).json({ error: 'Only contributors can create posts' });
    }
    const { title, content } = req.body;
    try {
        const post = new Post_1.Post({ title, content, author: req.user._id });
        yield post.save();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.createPost = createPost;
// Admins or post authors can delete
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const post = yield Post_1.Post.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin' && post.author.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString())) {
        return res.status(403).json({ error: 'Unauthorized' });
    }
    yield post.remove();
    res.json({ message: 'Post deleted' });
});
exports.deletePost = deletePost;
// Visitors can view posts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.Post.find().populate('author', 'username').populate('comments');
    res.status(200).json(posts);
});
exports.getPosts = getPosts;
