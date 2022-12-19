import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/User";

class UserRepository {
    async getAll(): Promise<User[]> {
        return await AppDataSource.createQueryBuilder().select("user").from(User, "user").getMany();
    }

    async getById(id: number): Promise<User | null> {
        return await AppDataSource.createQueryBuilder().select("user").from(User, "user").where("user.id = :id", { id: id }).getOne();
    }

    async getByUsername(username: string): Promise<User | null> {
        return await AppDataSource.createQueryBuilder().select("user").from(User, "user").where("user.username = :username", { username: username }).getOne();
    }

    async add(user: User): Promise<InsertResult> {
        return await AppDataSource.createQueryBuilder().insert().into(User).values([user]).execute();
    }

    async edit(id: number, user: User): Promise<UpdateResult> {
        return await AppDataSource.createQueryBuilder().update(User).set(user).where("id = :id", { id: id }).execute();
    }

    async delete(id: number): Promise<DeleteResult> {
        return await AppDataSource.createQueryBuilder().delete().from(User).where("id = :id", { id: id }).execute();
    }
}

export default new UserRepository();
