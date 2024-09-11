"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const cache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.originalUrl || req.url;
    try {
        const data = yield client.get(key);
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
});
exports.cache = cache;
