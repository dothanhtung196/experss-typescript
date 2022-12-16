import express, { Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/user-controller";

var router = express.Router();
let userController = new UserController();

/* GET users listing. */
router.get("/", (req: Request, res: Response, next: NextFunction) => userController.getAll(req, res, next));
router.get("/:id", (req: Request, res: Response, next: NextFunction) => userController.getById(req, res, next))
router.post("/", (req: Request, res: Response, next: NextFunction) => userController.add(req, res, next));
router.put("/:id", (req: Request, res: Response, next: NextFunction) => userController.edit(req, res, next));
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => userController.delete(req, res, next));

export { router as usersRouter };
