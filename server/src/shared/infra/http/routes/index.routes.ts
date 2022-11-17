import { accountRoutes } from '@modules/account/infra/http/routes/account.routes';
import { transactionRoutes } from '@modules/transaction/infra/http/routes/transaction.routes';
import { userRoutes } from '@modules/user/infra/http/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/account', accountRoutes);
routes.use('/user', userRoutes);
routes.use('/transaction', transactionRoutes);

export { routes };
