import { Request, Response, NextFunction, RequestHandler, Router } from "express";
import { RouteDefinition } from "../types/route-definition";
import { app } from "../../app";

export const RouteMap = (controllerList: Array<any>) => {
    controllerList.forEach((controller: any) => {
        const instance = new controller();

        const prefix = Reflect.getMetadata("prefix", controller);
        const routes: Array<RouteDefinition> = Reflect.getMetadata("routes", controller);

        let appRouter: Router = Router({ mergeParams: true });

        for (let i = 0; i < routes.length; i++) {
            const middlewares: Array<RequestHandler> =
                Reflect.getMetadata("middlewares", controller, routes[i].methodName) || [];
            appRouter[routes[i].requestMethod](
                `/${routes[i].path}`,
                middlewares,
                (req: Request, res: Response, next: NextFunction) => {
                    instance[routes[i].methodName](req, res, next);
                }
            );
        }

        app.use(`/${prefix}`, appRouter);
    });
};
