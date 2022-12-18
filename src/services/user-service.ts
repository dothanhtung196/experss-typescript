import { DeleteResult, InsertResult, UpdateResult } from "typeorm";
import { User } from "../database/entities/User";
import { StringCipher } from "../core/common/string-cipher";
import { UserRepository } from "../repositories/user-repository";

export class UserService {
    userRepository: UserRepository;
    stringCipher: StringCipher;
    constructor() {
        this.userRepository = new UserRepository();
        this.stringCipher = new StringCipher();
    }

    async getAll(): Promise<User[]> {
        return await this.userRepository.getAll();
    }

    async getById(id: number): Promise<User | null> {
        return await this.userRepository.getById(id);
    }

    async getByUsername(username: string): Promise<User | null> {
        return await this.userRepository.getByUsername(username);
    }

    async add(user: User): Promise<InsertResult> {
        user.password = await this.stringCipher.hashPassword(user.password);
        return await this.userRepository.add(user);
    }

    async edit(id: number, user: User): Promise<UpdateResult> {
        return await this.userRepository.edit(id, user);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
