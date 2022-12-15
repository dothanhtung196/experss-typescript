import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

import { errorHandleMiddleware } from "./middleware/error-handle-middleware";

import { indexRouter } from "./routes/index";
import { usersRouter } from "./routes/users";

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(errorHandleMiddleware.handleNotFound);

// error handler
app.use(errorHandleMiddleware.handleError);

export { app };
