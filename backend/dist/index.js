import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import swaggerDocs from './swagger.js';
import path from 'path';
import commentRouter from './routes/commentRoutes.js';
import postRouter from './routes/postRoutes.js';
import userRouter from './routes/userRoutes.js';
import notificationRouter from './routes/notificationRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import { fileURLToPath } from 'url';
// Get __filename and __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
// Middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
// Middleware to handle static file (photo)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
console.log('Serving uploads from:', path.join(__dirname, '..', 'uploads'));
// Middleware and routes setup
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notifications', notificationRouter);
app.use('/api/v1/admins', adminRouter);
app.use(express.json());
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
export default app;
