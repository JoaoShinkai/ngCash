import { Router } from 'express';
import AccountController from '../controllers/AccountController';

const accountRoutes = Router();
const accountController = new AccountController();

accountRoutes.post('/', accountController.create);

export { accountRoutes };
