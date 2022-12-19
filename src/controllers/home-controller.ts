import { Request, Response, NextFunction } from "express";
import { Use } from "../core/decorators/common-decorator";
import { Controller, Get } from "../core/decorators/route-decorator";
import { Authentication } from "../core/authentication/authentication";

@Controller("")
export class HomeController {
    @Get("")
    get(req: Request, res: Response, next: NextFunction): void {
        res.render('index', { title: 'Express' });
    }
}