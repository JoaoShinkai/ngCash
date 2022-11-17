import { IAccountDTO } from '@modules/account/dtos/IAccountDTO';
import IDefaultDTO from '@shared/dtos/IDefaultDTO';

export interface ITransactionDTO extends IDefaultDTO {
  debitedAccount: IAccountDTO;
  creditedAccount: IAccountDTO;
  value: number;
}
