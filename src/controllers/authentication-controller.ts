import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Use } from "../core/decorators/common-decorator";
import { Controller, Post } from "../core/decorators/route-decorator";
import { NoAuthentication } from "../middlewares/no-authentication";
import { ResponseModel } from "../models/response-model";
import { AuthenticationService } from "../services/authentication-service";
import { UserService } from "../services/user-service";

@Controller("authentications")
export class AuthenticationController {
    authenticationService: AuthenticationService;
    userService: UserService;
    constructor() {
        this.authenticationService = new AuthenticationService();
        this.userService = new UserService();
    }

    @Post("login")
    @Use(NoAuthentication)
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let { username, password } = req.body;

            let user = await this.authenticationService.login(username, password);
            if (!user) throw createHttpError.Unauthorized("Username or password is not incorrect");

            user.lastLoginIp = req.ip;
            await this.userService.edit(user.id, user);
            res.json(new ResponseModel(user));
        } catch (error) {
            next(error);
        }
    }
}
