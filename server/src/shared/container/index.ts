import AccountRepository from '@modules/account/infra/typeorm/repositories/AccountRepository';
import { IAccountRepository } from '@modules/account/repositories/IAccountRepository';
import TransactionRepository from '@modules/transaction/infra/typeorm/repositories/TransactionRepository';
import { ITransactionRepository } from '@modules/transaction/repositories/ITransactionRepository';
import UserRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { container } from 'tsyringe';

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository
);
