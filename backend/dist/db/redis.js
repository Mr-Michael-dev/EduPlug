// module contains a class RedisClient that defines
// a connection to redisClient and a set and get method
<<<<<<< HEAD
const redis_1 = require("redis");
class RedisClient {
    constructor() {
        this.client = (0, redis_1.createClient)({
=======
import { createClient } from 'redis';
class RedisClient {
    constructor() {
        this.client = createClient({
>>>>>>> cd32b3d41311f94055d682a69f4e811433c89121
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });
        this.client.on('error', (err) => {
            console.error(`Error connecting to Redis client: ${err}`);
        });
        this.client.connect().catch((err) => {
            console.error('Redis connection error:', err);
        });
    }
<<<<<<< HEAD
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
=======
    async isAlive() {
        try {
            await this.client.ping(); // Await the ping operation
            return true;
        }
        catch (err) {
            console.error('Ping error:', err);
            return false;
        }
    }
    async get(key) {
        try {
            const value = await this.client.get(key);
            return value;
        }
        catch (err) {
            console.error(`Error getting key ${key}:`, err);
            return null;
        }
    }
    async set(key, value, duration) {
        try {
            await this.client.set(key, value);
            await this.client.expire(key, duration);
        }
        catch (err) {
            console.error(`Error setting key ${key}:`, err);
        }
    }
    async del(key) {
        try {
            await this.client.del(key);
        }
        catch (err) {
            console.error(`Error deleting key ${key}:`, err);
        }
>>>>>>> cd32b3d41311f94055d682a69f4e811433c89121
    }
}
const redisClient = new RedisClient();
export default redisClient;
