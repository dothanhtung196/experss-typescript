import { NextFunction, Request, Response } from "express";

export const noAuthentication = (req: Request, res: Response, next: NextFunction) => {
    try {
        next();
    } catch (error) {
        next(error);
    }
}