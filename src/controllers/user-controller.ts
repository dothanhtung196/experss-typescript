import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { User } from "../database/entities/User";
import { ResponseModel } from "../models/response-model";
import { UserService } from "../services/user-service";

export class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let users = await this.userService.getAll();
            res.json(new ResponseModel(users));
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            let {id} = req.params;
            let user = await this.userService.getById(Number(id));
            if(!user) throw createHttpError.NotFound("User does not exists in database.");

            res.json(new ResponseModel(user));
        } catch (error) {
            next(error);
        }
    }

    async add(req: Request, res: Response, next: NextFunction) {
        try {
            let user: User = req.body;
            let result = await this.userService.add(user);
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }

    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            let { id } = req.params;
            let user: User = req.body;

            let result = await this.userService.edit(Number(id), user);
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction){
        try {
            let {id} = req.params;
            let result = await this.userService.delete(Number(id));
            res.json(new ResponseModel(result));
        } catch (error) {
            next(error);
        }
    }
}
