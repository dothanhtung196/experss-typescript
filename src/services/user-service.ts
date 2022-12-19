import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import stringHelper from "../core/common/string-helper";
import { User } from "../database/entities/User";
import userRepository from "../repositories/user-repository";

class UserService {
    async getAll(): Promise<User[]> {
        return await userRepository.getAll();
    }

    async getById(id: number): Promise<User | null> {
        return await userRepository.getById(id);
    }

    async getByUsername(username: string): Promise<User | null> {
        return await userRepository.getByUsername(username);
    }

    async add(user: User): Promise<InsertResult> {
        user.password = await stringHelper.hashPassword(user.password);
        return await userRepository.add(user);
    }

    async edit(id: number, user: User): Promise<UpdateResult> {
        return await userRepository.edit(id, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await userRepository.delete(id);
    }
}

export default new UserService();
