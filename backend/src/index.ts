import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
import notificationRoutes from './routes/notificationRoutes';
import swaggerDocs from './swagger';


dotenv.config();

const app = express();

// Middleware
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);

// Swagger Documentation
swaggerDocs(app);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/edu-db-plug';

// mongoose.connect(MONGO_URL);
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((error: Error) => console.error('MongoDB connection error:', error));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure code
  });