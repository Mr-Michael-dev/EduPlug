import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerDocs from './swagger';

import commentRouter from './routes/commentRoutes';
import postRouter from './routes/postRoutes';
import userRouter from './routes/userRoutes';
import notificationRouter from './routes/notificationRoutes';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/comments', commentRouter);
app.use('/posts', postRouter);
app.use('/users', userRouter);
app.use('/notifications', notificationRouter);
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
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

export default app;
