import redisClient from '../db/redis.js';
const cacheTimeout = process.env.CACHE_TIMEOUT || 600;
const cache = async (req, res, next) => {
    const key = req.originalUrl || req.url;
    try {
        const data = await redisClient.get(key);
        if (data) {
            // If cache hit, send the cached data
            res.send(JSON.parse(data));
        }
        else {
            // If cache miss, proceed to the next middleware/route handler
            const sendResponse = res.send.bind(res);
            res.send = (body) => {
                sendResponse(body); // Send the response immediately
                // After response is sent, store it in Redis cache
                redisClient.set(key, JSON.stringify(body), typeof cacheTimeout === 'string' ? parseInt(cacheTimeout) : cacheTimeout).catch((err) => {
                    console.error('Redis set error:', err);
                });
                return res; // Return the response object
            };
            next();
        }
    }
    catch (err) {
        console.error('Redis get error:', err);
        next();
    }
};
export { cache };
