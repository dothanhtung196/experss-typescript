import { Request, Response, NextFunction } from "express";
import { Use } from "../core/decorators/common-decorator";
import { Controller, Get } from "../core/decorators/route-decorator";
import { authMiddlware } from "../middlewares/auth-middlware";
import { roleAuthorization } from "../middlewares/role-authentication";

@Controller("")
export class HomeController {
    @Get("")
    @Use(authMiddlware)
    get(req: Request, res: Response, next: NextFunction): void {
        res.render('index', { title: 'Express' });
    }
}