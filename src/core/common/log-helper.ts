import { NextFunction, Request, Response } from "express";
import fs from "fs";
import moment from "moment";
import path from "path";

export const LogRequest = (req: Request, res: Response, next: NextFunction): void => {
    let logData: any = [moment().format("YYYY-MM-DD HH:mm:ss"), req.method, req.url, req.body];
    fs.appendFileSync(
        path.join(__dirname, `../../../logs/request/${moment().format("YYYYMMDD")}.log`),
        `${JSON.stringify(logData)} \n`
    );
    next();
};

export const AutoClearLog = (time: number) => {
    setInterval(function () {
        console.log("aaaa")
    }, time);
}


// AutoClearLog(1000);