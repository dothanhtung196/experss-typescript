import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userService from "../../services/user-service";
import jwtHelper from "../common/jwt-helper";
import stringHelper from "../common/string-helper";
import { ClaimDefinition } from "../types/claim-definition";

export const RoleAuthorization = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if (!roles || roles.length == 0) return next(new Error("Role parameter is undefined."));

        let token = stringHelper.getToken(req.headers["authorization"] || "");
        if (!token) return next(createHttpError.Unauthorized("Can not get token from header."));

        try {
            let { userId } = jwtHelper.decode(token) as ClaimDefinition;
            let user = await userService.getUserWithRole(userId);

            if (!user) return next(createHttpError.Unauthorized("User not exists in database."));

            if (roles.some((x) => x == user?.role.code)) return next();
            else return next(createHttpError.Unauthorized("User don't have permission."));
        } catch (error) {
            return next(error);
        }
    };
};
