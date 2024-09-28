// module contains a class RedisClient that defines
// a connection to redisClient and a set and get method
import { createClient } from 'redis';
class RedisClient {
    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });
        this.client.on('error', (err) => {
            console.error(`Error connecting to Redis client: ${err}`);
        });
        this.client.connect().catch((err) => {
            console.error('Redis connection error:', err);
        });
    }
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
    }
}
const redisClient = new RedisClient();
export default redisClient;
