import Redis from "ioredis";

class RedisHelper {
    redis: Redis;
    constructor() {
        this.redis = new Redis({
            port: Number(process.env.REDIS_PORT),
            host: process.env.REDIS_HOST,
            // username: process.env.REDIS_USER,
            // password: process.env.REDIS_PASSWORD,
            // db: 0,
        });
    }

    async setData(key: string, value: string): Promise<any> {
        return await this.redis.set(key, value);
    }

    async getData(key: string): Promise<any> {
        return await this.redis.get(key);
    }

    async setDataExpired(key: string, value: string, lifeTime: number): Promise<any> {
        return await this.redis.set(key, value, "EX", lifeTime);
    }

    async removeData(key: string){
        return await this.redis.del(key);
    }
}

export default new RedisHelper();