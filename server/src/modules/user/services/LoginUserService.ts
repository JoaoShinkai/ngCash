import { AppError } from '@shared/errors/AppError';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserRepository } from '../repositories/IUserRepository';

interface ILoginUser {
  user: Partial<IUserDTO>;
  token: string;
}

@injectable()
export class LoginUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute(
    username: string,
    password: string
  ): Promise<ILoginUser> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new AppError('Usuário e/ou senha inválidos', 401);
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      throw new AppError('Usuário e/ou senha inválidos', 401);
    }

    const token = await jwt.sign(
      {
        id: user.id,
        username: user.username
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1d'
      }
    );

    const newUser: Partial<IUserDTO> = user;

    delete newUser.password;

    return { user: newUser, token };
  }
}
