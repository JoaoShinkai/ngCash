import IDefaultDTO from '@shared/dtos/IDefaultDTO';

export interface IAccountDTO extends IDefaultDTO {
  balance: number;
}

export interface ICreateAccountDTO extends IDefaultDTO {
  balance?: number;
}
