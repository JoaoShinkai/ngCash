import { inject, injectable } from 'tsyringe';
import { IAccountDTO } from '../dtos/IAccountDTO';
import { IAccountRepository } from '../repositories/IAccountRepository';

@injectable()
export default class CreateAccountService {
  constructor(
    @inject('AccountRepository')
    private accountRepository: IAccountRepository
  ) {}

  public async execute(data: IAccountDTO): Promise<IAccountDTO> {
    return this.accountRepository.create(data);
  }
}
