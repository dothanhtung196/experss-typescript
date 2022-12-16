import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User";
import { Role } from "./entities/role";
import { Permission } from "./entities/permission";
import { Menu } from "./entities/menu";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Role, Permission, Menu],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Database connect success!");
    })
    .catch((error) => console.log(error));
