import { Request, Response, NextFunction, RequestHandler } from "express";
import { RouteDefinition } from "../types/route-definition";
import { app } from "../../app";

export const RouteMap = (controllerList: Array<any>) => {
    controllerList.forEach((controller: any) => {
        const instance = new controller();

        const prefix = Reflect.getMetadata('prefix', controller);
        const routes: Array<RouteDefinition> = Reflect.getMetadata('routes', controller);

        routes.forEach((route: RouteDefinition) => {
            const middlewares: Array<RequestHandler> = Reflect.getMetadata("middlewares", controller, route.methodName) || [];

            app[route.requestMethod](`/${prefix}/${route.path}`, middlewares, (req: Request, res: Response, next: NextFunction) => {
                instance[route.methodName](req, res, next);
            });
        })
    })
} 