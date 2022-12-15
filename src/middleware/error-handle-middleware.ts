import createError from "http-errors";
import { Request, Response, NextFunction } from "express";

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
        res.json({
            // status: err.status || 500,
            isSuccess: false,
            message: err.message
        });
    }
}

let errorHandleMiddleware = new ErrorHandleMiddleware();

export { errorHandleMiddleware };
