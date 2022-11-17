import { IAccountDTO } from '@modules/account/dtos/IAccountDTO';
import Account from '@modules/account/infra/typeorm/entities/Account';
import { ITransactionDTO } from '@modules/transaction/dtos/ITransactionDTO';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('transactions')
export default class Transaction
  extends DefaultEntity
  implements ITransactionDTO
{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'debited_account_id' })
  debitedAccount: IAccountDTO;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'credited_account_id' })
  creditedAccount: IAccountDTO;

  @Column()
  value: number;
}
