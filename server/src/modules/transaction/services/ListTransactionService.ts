import { inject, injectable } from 'tsyringe';
import { ITransactionDTO } from '../dtos/ITransactionDTO';
import { ITransactionRepository } from '../repositories/ITransactionRepository';

@injectable()
export default class ListTransactionService {
  constructor(
    @inject('TransactionRepository')
    private transactionRepository: ITransactionRepository
  ) {}

  public async execute(id: number): Promise<ITransactionDTO[]> {
    const sent = await this.transactionRepository.listSent(id);
    const received = await this.transactionRepository.listReceived(id);

    return [...sent, ...received];
  }
}
