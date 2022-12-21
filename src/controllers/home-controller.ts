import { Request, Response, NextFunction } from "express";
import { Use } from "../core/decorators/common-decorator";
import { Controller, Get, Post } from "../core/decorators/route-decorator";
import { Authentication } from "../core/authentication/authentication";
import { UploadSingleToMemory } from "../core/common/upload-module";

@Controller("")
export class HomeController {
    @Get("")
    get(req: Request, res: Response, next: NextFunction): void {
        res.render('index', { title: 'Express' });
    }

    @Post("upload")
    @Use(UploadSingleToMemory("file"))
    upload(req: Request, res: Response, next: NextFunction){
        res.json(req.file);
    }
}