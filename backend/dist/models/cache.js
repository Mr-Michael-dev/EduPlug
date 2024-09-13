<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = exports.client = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: process.env.REDIS_URL
});
exports.client = client;
client.on('error', (err) => {
    console.error('Redis error:', err);
});
=======
import redisClient from '../db/redis.js';
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
const cacheTimeout = process.env.CACHE_TIMEOUT || 600;
const cache = async (req, res, next) => {
    const key = req.originalUrl || req.url;
    try {
<<<<<<< HEAD
        const data = await client.get(key);
=======
        const data = await redisClient.get(key);
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
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
<<<<<<< HEAD
exports.cache = cache;
//# sourceMappingURL=cache.js.map
=======
export { cache };
>>>>>>> 93d26dc3dc7f5ad4d3ee5dab137a30d445ae819f
