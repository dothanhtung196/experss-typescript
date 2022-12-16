import { createClient, RedisClientType } from "@redis/client";

export class RedisConnection {
    client: RedisClientType;

    constructor() {
        this.client = createClient({
            legacyMode: true,
            socket: {
                port: 6379,
                host: "202.158.246.41",
            },
        });

        this.client.on("error", (err) => {
            throw new Error(`Redis: ${err}`);
        });
    }

    async connect() {
        return await this.client.connect();
    }

    async disconnect() {
        return await this.client.disconnect();
    }

    async setValue(key: string, value: string): Promise<void> {
        try {
            await this.connect();
            let result = await this.client.set(key, value);
            if (result) await this.disconnect();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async setValueExpired(key: string, value: string, expired: number): Promise<void> {
        try {
            await this.connect();
            let result = await this.client.set(key, value, {
                EX: expired,
                NX: true,
            });
            if (result) await this.disconnect();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async getValue(key: string): Promise<string | undefined> {
        try {
            await this.connect();
            let result = await this.client.get(key);
            if (result) return result;
            await this.disconnect();
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async deleteValue(key: string){
        try {
            await this.connect();
            await this.client.del(key);
            await this.disconnect();
        } catch (error: any) {
            throw new Error(error);
        }
    }
}
