import { User } from "../database/entities/User";
import { StringCipher } from "../core/common/string-cipher";
import { UserModel } from "../models/user-model";
import { UserRepository } from "../repositories/user-repository";

export class AuthenticationService {
    userRepository: UserRepository;
    stringCipher: StringCipher;

    constructor() {
        this.userRepository = new UserRepository();
        this.stringCipher = new StringCipher();
    }

    async login(username: string, password: string): Promise<User | null> {
        let user = await this.userRepository.getByUsername(username);
        if (!user) return null;

        let isPasswordCheck = await this.stringCipher.comparePassword(password, user.password);
        if (!isPasswordCheck) return null;

        // let userModel = new UserModel(user);
        // userModel.refreshToken = "";
        // let claim: object = {
        //     userId: user.id
        // };

        return user;
    }
}
