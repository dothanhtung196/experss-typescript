import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import 'reflect-metadata';
import dotenv from "dotenv";

import { AppDataSource } from "./database/data-source";
import { UserController } from "./controllers/user-controller";
import { HomeController } from "./controllers/home-controller";
import { AuthenticationController } from "./controllers/authentication-controller";
import { RouteMap } from "./core/routes/route-map";
import { HandleError, HandleNotFound } from "./core/exception/global-error-handle";

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


// initial database
AppDataSource.initialize()
    .then(() => {
        console.log("Database connect success!");
    })
    .catch((error) => console.log(error));

RouteMap([
    HomeController,
    UserController,
    AuthenticationController
])

app.use(HandleNotFound);
app.use(HandleError);

export { app };
