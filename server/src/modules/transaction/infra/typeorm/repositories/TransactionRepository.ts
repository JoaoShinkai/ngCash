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
}
