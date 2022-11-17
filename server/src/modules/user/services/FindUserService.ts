import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class FindUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(id: number): Promise<Partial<IUserDTO>> {
    const user = await this.userRepository.find(id);

    if (!user) {
      throw new AppError('Cannot find user with this id', 422);
    }

    const newUser: Partial<IUserDTO> = user;

    delete newUser.password;

    return newUser;
  }
}
