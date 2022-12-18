import { RequestHandler } from "express";

export function Use(middleware: RequestHandler): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void {
        if (!Reflect.hasMetadata('middlewares', target.constructor, propertyKey)) {
            Reflect.defineMetadata('middlewares', [], target.constructor, propertyKey);
        }

        const middlewares = Reflect.getMetadata("middlewares", target.constructor, propertyKey) || [];

        Reflect.defineMetadata(
            "middlewares",
            [...middlewares, middleware],
            target.constructor,
            propertyKey
        );
    };
}