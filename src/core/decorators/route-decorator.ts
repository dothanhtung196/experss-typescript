import { RouteDefinition } from "../types/route-definition";

export const Controller = (prefix: string = ""): ClassDecorator => {
    return (target: Function): void => {
        Reflect.defineMetadata("prefix", prefix, target);

        if (!Reflect.hasMetadata("routes", target)) {
            Reflect.defineMetadata("routes", [], target);
        }

        if (!Reflect.hasMetadata("middlewares", target)) {
            Reflect.defineMetadata("middlewares", [], target);
        }
    }
}

export const Get = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {

        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: 'get',
            path,
            methodName: propertyKey.toString()
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};

export const Post = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {

        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: 'post',
            path,
            methodName: propertyKey.toString()
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};

export const Put = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {

        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: 'put',
            path,
            methodName: propertyKey.toString()
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};

export const Delete = (path: string): MethodDecorator => {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
        if (!Reflect.hasMetadata('routes', target.constructor)) {
            Reflect.defineMetadata('routes', [], target.constructor);
        }

        const routes = Reflect.getMetadata('routes', target.constructor) as Array<RouteDefinition>;

        routes.push({
            requestMethod: 'delete',
            path,
            methodName: propertyKey.toString()
        });
        Reflect.defineMetadata('routes', routes, target.constructor);
    };
};