import { redisClient } from "./redisClient";
import { IRedisProvider } from "../../../repositories/interface/IRedisProvider";

export class RedisProvider implements IRedisProvider {
    async get<T>(key: string): Promise<T | null> {
        const value = await redisClient.get(key);
        return value ? JSON.parse(value) as T : null;
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        if (ttl) {
            await redisClient.set(key, JSON.stringify(value), "EX", ttl);
        } else {
            await redisClient.set(key, JSON.stringify(value));
        }
    }

    async del(key: string): Promise<void> {
        await redisClient.del(key);
    }
}