import { NextFunction, Request, Response } from "express";
import jwtHelper from "../common/jwt-helper";
import stringHelper from "../common/string-helper";
import { ClaimDefinition } from "../types/claim-definition";

export const RoleAuthorization = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if(!roles || roles.length == 0) return next(new Error("Role parameter is undefined."));

        let token = stringHelper.getToken(req.headers["authorization"] || "");

        try {
            let { userId } = jwtHelper.decode(token) as ClaimDefinition;
            return next();
        } catch (error) {
            return next(error)
        }
    }
}