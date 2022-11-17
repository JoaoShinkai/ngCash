import createUserSchema from '@modules/user/schemas/create-user.schema';
import loginUserSchema from '@modules/user/schemas/login-user.schema';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post(
  '/',
  [celebrate({ [Segments.BODY]: createUserSchema })],
  userController.create
);

userRoutes.get('/:id', userController.find);

userRoutes.post(
  '/login',
  [celebrate({ [Segments.BODY]: loginUserSchema })],
  userController.login
);

export { userRoutes };
