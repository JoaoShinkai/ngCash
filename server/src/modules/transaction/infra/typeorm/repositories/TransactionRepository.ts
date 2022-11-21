import { ITransactionDTO } from '@modules/transaction/dtos/ITransactionDTO';
import { ITransactionRepository } from '@modules/transaction/repositories/ITransactionRepository';
import { getRepository, Repository } from 'typeorm';
import Transaction from '../entities/Transaction';

export default class TransactionRepository implements ITransactionRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  create(data: ITransactionDTO): Promise<ITransactionDTO> {
    return this.repository.save(data);
  }

  listReceived(id: number): Promise<ITransactionDTO[]> {
    return this.repository.find({
      where: {
        creditedAccount: {
          id
        }
      },
      relations: [
        'debitedAccount',
        'debitedAccount.user',
        'creditedAccount',
        'creditedAccount.user'
      ],
      order: {
        id: 'DESC'
      }
    });
  }

  listSent(id: number): Promise<ITransactionDTO[]> {
    return this.repository.find({
      where: {
        debitedAccount: {
          id
        }
      },
      relations: [
        'debitedAccount',
        'debitedAccount.user',
        'creditedAccount',
        'creditedAccount.user'
      ],
      order: {
        id: 'DESC'
      }
    });
  }
}
