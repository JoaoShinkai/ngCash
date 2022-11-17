import { IAccountDTO } from '@modules/account/dtos/IAccountDTO';
import IDefaultDTO from '@shared/dtos/IDefaultDTO';

export interface IUserDTO extends IDefaultDTO {
  username: string;
  password: string;
  account: IAccountDTO;
}
