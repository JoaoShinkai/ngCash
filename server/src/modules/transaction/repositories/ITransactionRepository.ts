import { ITransactionDTO } from '../dtos/ITransactionDTO';

export interface ITransactionRepository {
  create(data: ITransactionDTO): Promise<ITransactionDTO>;
}
