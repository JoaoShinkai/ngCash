import { IUserDTO } from '../dtos/IUserDTO';

export interface IUserRepository {
  create(data: IUserDTO): Promise<IUserDTO>;
  find(id: number): Promise<IUserDTO | undefined>;
  findByUsername(username: string): Promise<IUserDTO | undefined>;
  hashPassword(password: string): Promise<string>;
}
