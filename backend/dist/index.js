<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerDocs = require('./swagger');
// import express from 'express';
// import http from 'http';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';
// import compression from 'compression';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import swaggerDocs from './swagger';
const commentRouter = require('./routes/commentRoutes');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');
const notificationRouter = require('./routes/notificationRoutes');
=======
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerDocs from './swagger.js';
import commentRouter from './routes/commentRoutes.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
dotenv.config();
const app = express();
// Middleware
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
<<<<<<< HEAD
app.use('/comments', commentRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/notifications', notificationRouter);
=======
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notifications', notificationRouter);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
// Middleware and routes setup
app.use(express.json());
// app.use('/api', router);
// Swagger Documentation
swaggerDocs(app);
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGODB_URI || '';
mongoose.connect(mongoUrl)
    .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}.\nVisit http://127.0.0.1:${PORT}/api/v1/ to access sever`));
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
});
<<<<<<< HEAD
// module.exports = app;
exports.default = app;
//# sourceMappingURL=index.js.map
=======
export default app;
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
