import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ResponseModel } from "../models/response-model";
import { AuthenticationService } from "../services/authentication-service";
import { UserService } from "../services/user-service";

export class AuthenticationController {
    authenticationService: AuthenticationService;
    userService: UserService;
    constructor() {
        this.authenticationService = new AuthenticationService();
        this.userService = new UserService();
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            let { username, password } = req.body;

            let user = await this.authenticationService.login(username, password);
            if(!user) throw createHttpError.Unauthorized("Username or password is not incorrect");

            user.lastLoginIp = req.ip;
            await this.userService.edit(user.id, user);
            res.json(new ResponseModel(user));
        } catch (error) {
            next(error);
        }
    }
}
