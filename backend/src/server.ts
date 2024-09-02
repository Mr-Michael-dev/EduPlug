import express from 'express';
import { connectDB } from './db';
import userRoutes from './routes/userRoutes';
import commentRoutes from './routes/commentRoutes';
import postRoutes from './routes/postRoutes';
import swaggerDocs from './swagger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

swaggerDocs(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
