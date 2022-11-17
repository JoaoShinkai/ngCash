import {
  IAccountDTO,
  ICreateAccountDTO
} from '@modules/account/dtos/IAccountDTO';
import { IAccountRepository } from '@modules/account/repositories/IAccountRepository';
import { getRepository, Repository } from 'typeorm';
import Account from '../entities/Account';

export default class AccountRepository implements IAccountRepository {
  private repository: Repository<Account>;

  constructor() {
    this.repository = getRepository(Account);
  }

  create(data: ICreateAccountDTO): Promise<IAccountDTO> {
    return this.repository.save(data);
  }

  find(id: number): Promise<IAccountDTO | undefined> {
    return this.repository.findOne(id);
  }

  update(id: number, data: IAccountDTO): Promise<IAccountDTO> {
    return this.repository.save({ id, ...data });
  }
}
