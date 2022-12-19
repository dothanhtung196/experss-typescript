import { LoginResponse } from "../models/login-response";
import jwtHelper from "../core/common/jwt-helper";
import { ClaimDefinition } from "../core/types/claim-definition";
import redisHelper from "../core/common/redis-helper";
import stringHelper from "../core/common/string-helper";
import userRepository from "../repositories/user-repository";

class AuthenticationService {
    async login(username: string, password: string, ip: string): Promise<LoginResponse | null> {
        let user = await userRepository.getByUsername(username);
        if (!user) return null;

        let isPasswordCheck = await stringHelper.comparePassword(password, user.password);
        if (!isPasswordCheck) return null;

        user.lastLoginIp = ip;
        user.lastLoginTime = new Date();
        await userRepository.edit(user.id, user);

        let loginResponseModel = new LoginResponse(user);

        let claim: ClaimDefinition = {
            userId: user.id,
        };

        loginResponseModel.accessToken = jwtHelper.signAccessToken(claim);
        loginResponseModel.refreshToken = jwtHelper.signRefreshToken(claim);

        await redisHelper.setDataExpired(`RefreshToken-${user.id}`, loginResponseModel.refreshToken, 60);

        return loginResponseModel;
    }

    async refreshToken(refreshToken: string): Promise<LoginResponse | null> {
        let {userId} = await jwtHelper.verifyRefreshToken(refreshToken) as ClaimDefinition;
        let refreshTokenCache = await redisHelper.getData(`RefreshToken-${userId}`);
        if (refreshToken != refreshTokenCache) return null;

        let user = await userRepository.getById(userId);

        if (!user) return null;

        let claim: ClaimDefinition = {
            userId: user.id,
        };

        let loginResponseModel = new LoginResponse(user);
        loginResponseModel.accessToken = jwtHelper.signAccessToken(claim);
        loginResponseModel.refreshToken = jwtHelper.signRefreshToken(claim);

        await redisHelper.setDataExpired(`RefreshToken-${user.id}`, loginResponseModel.refreshToken, 60);

        return loginResponseModel;
    }

    async logout(refreshToken: string): Promise<boolean> {
        let { userId } = (await jwtHelper.verifyRefreshToken(refreshToken)) as ClaimDefinition;
        let result = await redisHelper.removeData(`RefreshToken-${userId}`);
        if(result == 1) return true;
        else return false;
    }
}

export default new AuthenticationService();
