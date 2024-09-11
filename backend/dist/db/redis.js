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
// module contains a class RedisClient that defines
// a connection to redisClient and a set and get method
const redis_1 = require("redis");
class RedisClient {
    constructor() {
        this.client = (0, redis_1.createClient)({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });
        this.client.on('error', (err) => {
            console.error(`Error connecting to Redis client: ${err}`);
        });
        this.client.connect().catch((err) => {
            console.error('Redis connection error:', err);
        });
    }
    isAlive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.ping(); // Await the ping operation
                return true;
            }
            catch (err) {
                console.error('Ping error:', err);
                return false;
            }
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const value = yield this.client.get(key);
                return value;
            }
            catch (err) {
                console.error(`Error getting key ${key}:`, err);
                return null;
            }
        });
    }
    set(key, value, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.set(key, value);
                yield this.client.expire(key, duration);
            }
            catch (err) {
                console.error(`Error setting key ${key}:`, err);
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.del(key);
            }
            catch (err) {
                console.error(`Error deleting key ${key}:`, err);
            }
        });
    }
}
const redisClient = new RedisClient();
exports.default = redisClient;
