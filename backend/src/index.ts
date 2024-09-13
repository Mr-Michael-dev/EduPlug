import express from 'express';
import http from 'http';
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

dotenv.config();

const app = express();

// Middleware
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notifications', notificationRouter);
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
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

export default app;
