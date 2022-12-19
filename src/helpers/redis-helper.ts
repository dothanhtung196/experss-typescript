import Redis from "ioredis";

class RedisHelper {
    redis: Redis;
    constructor() {
        this.redis = new Redis({
            port: 6379,
            host: "202.158.246.41",
            // username: "default",
            // password: "my-top-secret",
            // db: 0,
        });
    }

    async setValue(key: string, value: string) {
        return await this.redis.set(key, value);
    }

    async getValue(key: string, value: string) {
        return await this.redis.get(key);
    }

    async setValueExpired(key: string, value: string, lifeTime: number) {
        return await this.redis.set(key, value, "EX", lifeTime);
    }
}

export default new RedisHelper();