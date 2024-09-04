import { createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';

// import express from 'express';
// import {
//   createPost,
//   getPosts,
//   getPostById,
//   updatePost,
//   deletePost,
//   likePost,
// } from '../controllers/postController';
// import { protect } from '../controllers/auth';

// const router = express.Router();

const client = createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const cache = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl || req.url;
  try {
    const data = await client.get(key);
    if (data) {
      res.send(JSON.parse(data));
    } else {
      const sendResponse = res.send.bind(res);
      res.send = (body) => {
        // Add your custom logic here
        return res;
      };
      next();
    }
  } catch (err) {
    console.error('Redis get error:', err);
    next();
  }
};

export { cache };

// router.route('/')
//   .post(protect, createPost)
//   .get(getPosts); // Removed 'cache' middleware

// router.route('/:id')
//   .get(getPostById)
//   .put(protect, updatePost)
//   .delete(protect, deletePost);

// router.route('/:id/like')
//   .post(protect, likePost);

// export default router;