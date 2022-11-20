import { AuthController } from '@modules/auth/AuthController';
import createUserSchema from '@modules/user/schemas/create-user.schema';
import loginUserSchema from '@modules/user/schemas/login-user.schema';
import userAuth from '@shared/infra/http/middlewares/userAuth';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();
const authController = new AuthController();

userRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: createUserSchema })],
  userController.create
);

userRoutes.get('/authenticate', userAuth, authController.VerifyStoreToken);
userRoutes.get('/:id', userController.find);

userRoutes.post(
  '/login',
  [celebrate({ [Segments.BODY]: loginUserSchema })],
  userController.login
);

export { userRoutes };
