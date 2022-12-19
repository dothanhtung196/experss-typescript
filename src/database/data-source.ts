import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";
import { Role } from "./entities/role";
import { Permission } from "./entities/permission";
import { Menu } from "./entities/menu";
import userSeed from "./seeds/user-seed";
import roleSeed from "./seeds/role-seed";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    logger: "file",
    entities: [User, Role, Permission, Menu],
    migrations: [],
    subscribers: [],
});

export const SeedData = async () => {
    await AppDataSource.manager.query("DELETE FROM user");
    await AppDataSource.manager.query("DELETE FROM role");

    await roleSeed.initialData();
    await userSeed.InitialData();
}