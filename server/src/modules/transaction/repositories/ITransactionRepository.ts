import { ITransactionDTO } from '../dtos/ITransactionDTO';

export interface ITransactionRepository {
  create(data: ITransactionDTO): Promise<ITransactionDTO>;
  listReceived(id: number): Promise<ITransactionDTO[]>;
  listSent(id: number): Promise<ITransactionDTO[]>;
}
