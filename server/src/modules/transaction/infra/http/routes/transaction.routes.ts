import userAuth from '@shared/infra/http/middlewares/userAuth';
import { Router } from 'express';
import TransactionController from '../controllers/TransactionController';

const transactionRoutes = Router();
const transactionController = new TransactionController();

transactionRoutes.post('/', userAuth, transactionController.create);
transactionRoutes.get('/', userAuth, transactionController.list);

export { transactionRoutes };
