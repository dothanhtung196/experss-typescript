import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwtHelper from "../helpers/jwt-helper";

export const authMiddlware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers['authorization']) throw createHttpError.Unauthorized();

        let authHeader: string = req.headers['authorization'];
        let bearerToken: Array<string> = authHeader.split(' ');
        let token: string = bearerToken[1];

        let payload = jwtHelper.verifyAccessToken(token);
        if (!payload) throw createHttpError.Unauthorized();
        return next();
    } catch (error) {
        next(error);
    }
}