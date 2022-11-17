import { IAccountRepository } from '@modules/account/repositories/IAccountRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITransactionDTO } from '../dtos/ITransactionDTO';
import { ITransactionRepository } from '../repositories/ITransactionRepository';

@injectable()
export default class CreateTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    debitUserId: number,
    creditUsername: string,
    value: number
  ): Promise<ITransactionDTO> {
    // Verify is the user exists
    const userToBeCredited = await this.userRepository.findByUsername(
      creditUsername
    );

    if (!userToBeCredited) {
      throw new AppError('Cannot find user with this name');
    }

    // Verify logged user
    const userToBeDebited = await this.userRepository.find(debitUserId);

    if (!userToBeDebited || !userToBeDebited.account.id) {
      throw new AppError('Cannot find account to be debited');
    }

    if (userToBeDebited.id === userToBeCredited.id) {
      throw new AppError('Cannot transfer to yourself');
    }

    // Verify if accounts exists
    if (!userToBeDebited.account.id || !userToBeCredited.account.id) {
      throw new AppError('Internal error');
    }

    // Consult accounts
    const debitAccount = await this.accountRepository.find(
      userToBeDebited.account.id
    );

    const creditAccount = await this.accountRepository.find(
      userToBeCredited.account.id
    );

    // Verify is accounts are consulted
    if (
      !debitAccount ||
      !creditAccount ||
      !debitAccount.id ||
      !creditAccount.id
    ) {
      throw new AppError('Cannot find account');
    }

    // Verify if the account to be debited has sufficient fund
    if (debitAccount.balance < value) {
      throw new AppError('Insufficient Fund');
    }

    try {
      const accountAfterDebit = await this.accountRepository.update(
        debitAccount.id,
        {
          balance: Number(debitAccount.balance) - value
        }
      );

      const accountAfterCredit = await this.accountRepository.update(
        creditAccount.id,
        {
          balance: Number(creditAccount.balance) + value
        }
      );

      const transaction = await this.transactionRepository.create({
        debitedAccount: accountAfterDebit,
        creditedAccount: accountAfterCredit,
        value
      });

      return transaction;
    } catch (err) {
      console.log(err);
      throw new AppError('Internal server error');
    }
  }
}
