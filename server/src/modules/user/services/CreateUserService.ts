import { IAccountRepository } from '@modules/account/repositories/IAccountRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('AccountRepository')
    private accountRepository: IAccountRepository
  ) {}

  public async execute(data: IUserDTO): Promise<IUserDTO> {
    const user = await this.userRepository.findByUsername(data.username);

    if (user) {
      throw new AppError('Username já utilizado');
    }

    const account = await this.accountRepository.create({});

    if (!account) {
      throw new Error();
    }

    const { password: pass } = data;
    const password = await this.userRepository.hashPassword(pass);

    const newUser = { ...data, password, account };

    return this.userRepository.create(newUser);
  }
}
