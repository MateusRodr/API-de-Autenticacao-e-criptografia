import redis, { Redis } from 'ioredis';

export const redisClient = new Redis({
    host: "redis",
    port: 6379,
})