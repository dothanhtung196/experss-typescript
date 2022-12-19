import { User } from "../database/entities/User";
import { StringCipher } from "../core/common/string-cipher";
import { UserRepository } from "../repositories/user-repository";
import { UserModel } from "../models/user-model";
import jwtHelper from "../helpers/jwt-helper";
import redisHelper from "../helpers/redis-helper";

export class AuthenticationService {
    userRepository: UserRepository;
    stringCipher: StringCipher;

    constructor() {
        this.userRepository = new UserRepository();
        this.stringCipher = new StringCipher();
    }

    async login(username: string, password: string, ip: string): Promise<UserModel | null> {
        let user = await this.userRepository.getByUsername(username);
        if (!user) return null;

        let isPasswordCheck = await this.stringCipher.comparePassword(password, user.password);
        if (!isPasswordCheck) return null;

        user.lastLoginIp = ip;
        user.lastLoginTime = new Date();
        await this.userRepository.edit(user.id, user);

        let userModel = new UserModel(user);

        let claim = {
            userId: user.id
        }

        userModel.accessToken = jwtHelper.signAccessToken(claim);
        userModel.refreshToken = jwtHelper.signRefreshToken(claim);

        await redisHelper.setValueExpired(`RefreshToken-${userModel.id}`, userModel.refreshToken, 60);

        return userModel;
    }
}
