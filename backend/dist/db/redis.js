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
const util_1 = require("util");
class RedisClient {
    // constructor initializes the RedisClient instance
    constructor() {
        this.client = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
        this.client.on('error', (err) => {
            console.error(`Error connecting to redis client: ${err}`);
        });
        // Promisify the get function after the client is initialized
        this.getAsync = (0, util_1.promisify)(this.client.get).bind(this.client);
        this.setAsync = (0, util_1.promisify)(this.client.set).bind(this.client);
        this.delAsync = (0, util_1.promisify)(this.client.del).bind(this.client);
        this.expireAsync = (0, util_1.promisify)(this.client.expire).bind(this.client);
    }
    isAlive() {
        // returns true when the connection to Redis is a success otherwise, false
        try {
            this.client.ping();
            return true;
        }
        catch (err) {
            return false;
        }
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            // takes a string key as argument and returns the Redis value stored for this key
            try {
                const value = yield this.getAsync(key);
                return value;
            }
            catch (err) {
                return null;
            }
        });
    }
    set(key, value, duration) {
        return __awaiter(this, void 0, void 0, function* () {
            // takes a string key, a value and a duration in second as arguments
            // to store it in Redis (with an expiration set by the duration argument)
            try {
                yield this.setAsync(key, value);
                yield this.expireAsync(key, duration);
            }
            catch (err) {
                console.log(`error setting ${key} : ${value}: ${err}`);
            }
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            // takes a string key as argument and remove the value in Redis for this key
            try {
                yield this.delAsync(key);
            }
            catch (err) {
                console.log(`error deleting key ${key}`);
            }
        });
    }
}
const redisClient = new RedisClient();
exports.default = redisClient;
