import { createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';

const client = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

const cache = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.originalUrl || req.url;
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        client.setex(key, 3600, JSON.stringify(body)); // Cache data for 1 hour
        return res.sendResponse(body);
      };
      next();
    }
  } catch (err) {
    console.error('Redis get error:', err);
    next();
  }
};

export { cache, client };
