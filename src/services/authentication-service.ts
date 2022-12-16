import { User } from "../database/entities/User";
import { StringHelper } from "../helpers/string-helper";
import { UserModel } from "../models/user-model";
import { UserRepository } from "../repositories/user-repository";

export class AuthenticationService {
    userRepository: UserRepository;
    stringHelper: StringHelper;

    constructor() {
        this.userRepository = new UserRepository();
        this.stringHelper = new StringHelper();
    }

    async login(username: string, password: string): Promise<UserModel | null> {
        let user = await this.userRepository.getByUsername(username);
        if (!user) return null;

        let isPasswordCheck = await this.stringHelper.comparePassword(password, user.password);
        if (!isPasswordCheck) return null;

        let userModel = new UserModel(user);
        // userModel.refreshToken = "";
        // let claim: object = {
        //     userId: user.id
        // };

        return userModel;
    }
}
