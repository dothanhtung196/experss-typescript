import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Use } from "../core/decorators/common-decorator";
import { Controller, Post } from "../core/decorators/route-decorator";
import { ResponseModel } from "../models/response-model";
import { LoginRequest } from "../models/login-request";
import { Authentication } from "../core/authentication/authentication";
import { NoAuthentication } from "../core/authentication/no-authentication";
import { LoginValidate, RefreshTokenValidate } from "../validations/authentication-validate";
import messageCustom from "../helpers/message-custom";
import authenticationService from "../services/authentication-service";

@Controller("authentications")
export class AuthenticationController {
    @Post("login")
    @Use(NoAuthentication)
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let { error } = LoginValidate.validate(req.body, { abortEarly: false });
            if (error) throw createHttpError.BadRequest(messageCustom.validate(error));

            let { username, password }: LoginRequest = req.body as LoginRequest;
            let user = await authenticationService.login(username, password, req.ip);
            if (!user) throw createHttpError.Unauthorized("Username or password is not incorrect.");

            res.json(new ResponseModel(user));
        } catch (error) {
            next(error);
        }
    }

    @Post("refresh-token")
    @Use(NoAuthentication)
    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            let {error} = RefreshTokenValidate.validate(req.body, { abortEarly: false });
            if (error) throw createHttpError.BadRequest(messageCustom.validate(error));

            let { refreshToken } = req.body;

            let user = await authenticationService.refreshToken(refreshToken);
            if (!user) throw createHttpError.Unauthorized("User does not exists in database.");
            res.json(new ResponseModel(user));
        } catch (error) {
            next(error);
        }
    }

    @Post("logout")
    @Use(Authentication)
    async logout(req: Request, res: Response, next: NextFunction){
        try {
            let {error} = RefreshTokenValidate.validate(req.body, { abortEarly: false });
            if (error) throw createHttpError.BadRequest(messageCustom.validate(error));

            let { refreshToken } = req.body;
            let result = await authenticationService.logout(refreshToken);
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }
}
