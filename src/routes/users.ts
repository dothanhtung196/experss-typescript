import express, { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/User';

var router = express.Router();

/* GET users listing. */
router.get('/', async function (req: Request, res: Response, next: NextFunction) {
  const userRepository = AppDataSource.getRepository(User);

  // let user = new User();
  // user.username = "administrator";
  // user.fullName = "Do thanh tung";
  // user.address = "Tp HCM";
  // user.createdUser = 0;
  // user.createdTime = new Date();
  // user.updatedUser = 0;
  // user.updatedTime = new Date();

  var result = await userRepository.find();
  // res.send('respond with a resource 123');
  res.json(result);
});

export { router as usersRouter }
