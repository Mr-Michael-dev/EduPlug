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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
const redis_1 = __importDefault(require("../db/redis"));
const cacheTimeout = process.env.CACHE_TIMEOUT || 600;
const cache = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const key = req.originalUrl || req.url;
    try {
        const data = yield redis_1.default.get(key);
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
                redis_1.default.set(key, JSON.stringify(body), typeof cacheTimeout === 'string' ? parseInt(cacheTimeout) : cacheTimeout).catch((err) => {
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
});
exports.cache = cache;
