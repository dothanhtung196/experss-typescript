import { Logger, QueryRunner } from "typeorm";
import path from "path";
("path");
import fs from "fs";
import moment from "moment";

export class LogDatabase implements Logger {
    logQuery(query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined): void {
        let parameterMap = parameters?.map((parameter) => {
            if (typeof parameter == "string") return (parameter = `\`${parameter}\``);
            else if (typeof parameter == "object") return `\`${moment(parameter).format("YYYY-MM-DD HH:mm:ss")} \``;
            else return parameter;
        });

        let parametersStringBuilder = parameters ? `-- PARAMETERS: [${parameterMap}]` : "";
        let queryStringBuilder = `${query} ${parametersStringBuilder}`;

        if (!fs.existsSync("logs/database")) fs.mkdirSync("logs/database");

        fs.appendFileSync(
            path.join(__dirname, `../../../logs/database/${moment().format("YYYYMMDD")}.log`),
            `${queryStringBuilder} \n`
        );
    }

    logQueryError(
        error: string | Error,
        query: string,
        parameters?: any[] | undefined,
        queryRunner?: QueryRunner | undefined
    ) {
        // console.log(error, query, parameters, queryRunner)
    }

    logQuerySlow(time: number, query: string, parameters?: any[] | undefined, queryRunner?: QueryRunner | undefined) {
        // console.log(time, query, parameters, queryRunner)
    }

    logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
        // console.log(message, queryRunner)
    }

    logMigration(message: string, queryRunner?: QueryRunner | undefined) {
        // console.log(message, queryRunner);
    }

    log(level: "warn" | "info" | "log", message: any, queryRunner?: QueryRunner | undefined) {
        // console.log(level, message, queryRunner);
    }
}
