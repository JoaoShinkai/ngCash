import { IAccountDTO } from '@modules/account/dtos/IAccountDTO';
import User from '@modules/user/infra/typeorm/entities/User';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import {
  Column,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('accounts')
export default class Account extends DefaultEntity implements IAccountDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @OneToOne(() => User, user => user.account)
  @JoinTable()
  user: User;
}
