import express, { Request, Response, NextFunction } from "express";
import { AuthenticationController } from "../controllers/authentication-controller";

var router = express.Router();
let authenticationController = new AuthenticationController();


router.post("/login", (req: Request, res: Response, next: NextFunction) => authenticationController.login(req, res, next));

export { router as authenticationRouter };