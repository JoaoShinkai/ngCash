import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import bcryptjs from 'bcryptjs';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: IUserDTO): Promise<IUserDTO> {
    return this.repository.save(data);
  }

  async find(id: number): Promise<IUserDTO | undefined> {
    return this.repository.findOne(id, { relations: ['account'] });
  }

  async findByUsername(username: string): Promise<IUserDTO | undefined> {
    return this.repository.findOne({
      where: { username },
      relations: ['account']
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt(8);
    return bcryptjs.hashSync(password, salt);
  }
}
