// module contains a class RedisClient that defines
// a connection to redisClient and a set and get method
import { createClient, RedisClientType } from 'redis';

class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    this.client.on('error', (err: any) => {
      console.error(`Error connecting to Redis client: ${err}`);
    });

    this.client.connect().catch((err: any) => {
      console.error('Redis connection error:', err);
    });
  }

  async isAlive(): Promise<boolean> {
    try {
      await this.client.ping();  // Await the ping operation
      return true;
    } catch (err) {
      console.error('Ping error:', err);
      return false;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (err) {
      console.error(`Error getting key ${key}:`, err);
      return null;
    }
  }

  async set(key: string, value: string, duration: number): Promise<void> {
    try {
      await this.client.set(key, value);
      await this.client.expire(key, duration);
    } catch (err) {
      console.error(`Error setting key ${key}:`, err);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (err) {
      console.error(`Error deleting key ${key}:`, err);
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
