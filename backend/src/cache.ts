import { createClient } from 'redis';
import { Request, Response, NextFunction } from 'express';

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

