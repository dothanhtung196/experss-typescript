import { NextFunction, Request, Response } from "express";

export const NoAuthentication = (req: Request, res: Response, next: NextFunction): void => {
    try {
        next();
    } catch (error) {
        next(error);
    }
}