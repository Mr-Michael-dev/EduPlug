import redisClient  from '../db/redis';
import { Request, Response, NextFunction } from 'express';

const cacheTimeout = process.env.CACHE_TIMEOUT || 600;

const cache = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl || req.url;
  try {
    const data = await redisClient.get(key);
    if (data) {
      res.send(JSON.parse(data));
    } else {
      const sendResponse = res.send.bind(res);
      res.send = (body: any): Response => {
        redisClient.set(key, JSON.stringify(body),
        typeof cacheTimeout === 'string' ? parseInt(cacheTimeout) : cacheTimeout
        );
        return sendResponse(body);  // Make sure to call the original send function
      };
      next();
    }
  } catch (err) {
    console.error('Redis get error:', err);
    next();
  }
};

export { cache };