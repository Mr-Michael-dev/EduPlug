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
const cacheTimeout = process.env.CACHE_TIMEOUT || 600;
const cache = async (req, res, next) => {
    const key = req.originalUrl || req.url;
    try {
        const data = await client.get(key);
        if (data) {
            res.send(JSON.parse(data));
        }
        else {
            const sendResponse = res.send.bind(res);
            res.send = (body) => {
                client.set(key, JSON.stringify(body), {
                    EX: typeof cacheTimeout === 'string' ? parseInt(cacheTimeout) : cacheTimeout
                });
                return sendResponse(body); // Make sure to call the original send function
            };
            next();
        }
    }
    catch (err) {
        console.error('Redis get error:', err);
        next();
    }
};
exports.cache = cache;
//# sourceMappingURL=cache.js.map