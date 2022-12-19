import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { Use } from "../core/decorators/common-decorator";
import { Controller, Delete, Get, Post, Put } from "../core/decorators/route-decorator";
import { User } from "../database/entities/User";
import { Authentication } from "../core/authentication/authentication";
import { ResponseModel } from "../models/response-model";
import { RoleAuthorization } from "../core/authentication/role-authentication";
import userService from "../services/user-service";

@Controller("users")
export class UserController {
    @Get("")
    @Use(RoleAuthorization(["Client"]))
    @Use(Authentication)
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let users = await userService.getAll();
            res.json(new ResponseModel(users));
        } catch (error) {
            next(error);
        }
    }

    @Get(":id")
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params;
            let user = await userService.getById(Number(id));
            if (!user) throw createHttpError.NotFound("User does not exists in database.");

            res.json(new ResponseModel(user));
        } catch (error) {
            next(error);
        }
    }

    @Post("")
    async add(req: Request, res: Response, next: NextFunction) {
        try {
            let user: User = req.body as User;
            let result = await userService.add(user);
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }

    @Put(":id")
    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params;
            let user: User = req.body;

            let result = await userService.edit(Number(id), user);
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }

    @Delete(":id")
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params;
            let result = await userService.delete(Number(id));
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }
}
