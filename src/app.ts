import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "reflect-metadata";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import fs from "fs";

import { AppDataSource, SeedData } from "./database/data-source";
import { UserController } from "./controllers/user-controller";
import { HomeController } from "./controllers/home-controller";
import { AuthenticationController } from "./controllers/authentication-controller";
import { RouteMap } from "./core/routes/route-map";
import { HandleError, HandleNotFound } from "./core/exception/global-error-handle";
import { LogRequest } from "./core/common/log-helper";

var app = express();
dotenv.config();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

if (!fs.existsSync("logs")) fs.mkdirSync("logs");
if (!fs.existsSync("logs/database")) fs.mkdirSync("logs/database");
if (!fs.existsSync("logs/request")) fs.mkdirSync("logs/request");

// initial database
AppDataSource.initialize()
    .then(() => {
        console.log("Database connect success!");
        SeedData();
    })
    .catch((error) => console.log(error));

app.use(LogRequest);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(YAML.load(path.join(__dirname, "../swagger.yml"))));

RouteMap([HomeController, UserController, AuthenticationController]);

app.use(HandleNotFound);
app.use(HandleError);

export { app };
