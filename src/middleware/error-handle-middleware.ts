import createError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { ResponseModel } from "../models/response-model";

class ErrorHandleMiddleware {
    handleNotFound(req: Request, res: Response, next: NextFunction) {
        next(createError(404));
    }

    handleError(err: any, req: Request, res: Response, next: NextFunction) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        // res.render("error");
        res.json(new ResponseModel(null, err.message, true, err.status))
    }
}

let errorHandleMiddleware = new ErrorHandleMiddleware();

export { errorHandleMiddleware };
