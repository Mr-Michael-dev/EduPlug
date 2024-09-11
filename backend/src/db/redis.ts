// module contains a class RedisClient that defines
// a connection to redisClient and a set and get method
import { createClient, RedisClientType } from 'redis';
import { promisify } from 'util';

class RedisClient {
  // define private class properties
  private client: RedisClientType;
  private getAsync: (key: string) => Promise<string | null>;
  private setAsync: (key: string, value: string) => Promise<'OK'>;
  private delAsync: (key: string) => Promise<number>;
  private expireAsync: (key: string, seconds: number) => Promise<number>;

  // constructor initializes the RedisClient instance
  constructor() {
    this.client = createClient({url: process.env.REDIS_URL});
    this.client.on('error', (err: any) => {
      console.error(`Error connecting to redis client: ${err}`);
    });
    // Promisify the get function after the client is initialized
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.delAsync = promisify(this.client.del).bind(this.client);
    this.expireAsync = promisify(this.client.expire).bind(this.client);
  }

  isAlive() {
    // returns true when the connection to Redis is a success otherwise, false
    try {
      this.client.ping();
      return true;
    } catch (err) {
      return false;
    }
  }

  async get(key: string) {
    // takes a string key as argument and returns the Redis value stored for this key
    try {
      const value = await this.getAsync(key);
      return value;
    } catch (err) {
      return null;
    }
  }

  async set(key: string, value: string, duration: number) {
    // takes a string key, a value and a duration in second as arguments
    // to store it in Redis (with an expiration set by the duration argument)
    try {
      await this.setAsync(key, value);
      await this.expireAsync(key, duration);
    } catch (err) {
      console.log(`error setting ${key} : ${value}: ${err}`);
    }
  }

  async del(key: string) {
    // takes a string key as argument and remove the value in Redis for this key
    try {
      await this.delAsync(key);
    } catch (err) {
      console.log(`error deleting key ${key}`);
    }
  }
}

const redisClient = new RedisClient();

export default redisClient;
