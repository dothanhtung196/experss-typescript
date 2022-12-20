import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwtHelper from "../common/jwt-helper";
import redisHelper from "../common/redis-helper";
import { ClaimDefinition } from "../types/claim-definition";

export const Authentication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.headers["authorization"]) return next(createHttpError.Unauthorized());

    let token = jwtHelper.getToken(req.headers["authorization"]);
    if (!token) return next(createHttpError.Unauthorized("Can not get token from header."));

    try {
        await jwtHelper.verifyAccessToken(token);
        return next();
    } catch (error) {
        let { userId } = jwtHelper.decode(token) as ClaimDefinition;
        let accessTokenOld = await redisHelper.getData(`AccessTokenOld-${userId}`);

        if (accessTokenOld == token) {
            await redisHelper.removeData(`RefreshToken-${userId}`);
        } else {
            await redisHelper.setDataExpired(`AccessTokenOld-${userId}`, token, 2592000);
        }
        next(error);
    }
};
