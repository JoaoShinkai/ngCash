import { IAccountDTO, ICreateAccountDTO } from '../dtos/IAccountDTO';

export interface IAccountRepository {
  create(data: ICreateAccountDTO): Promise<IAccountDTO>;
  find(id: number): Promise<IAccountDTO | undefined>;
  update(id: number, data: IAccountDTO): Promise<IAccountDTO>;
}
