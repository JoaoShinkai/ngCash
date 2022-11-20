import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import IDefaultDTO from '@shared/dtos/IDefaultDTO';

export interface IAccountDTO extends IDefaultDTO {
  balance: number;
  user: IUserDTO;
}

export interface ICreateAccountDTO extends IDefaultDTO {
  balance?: number;
}
