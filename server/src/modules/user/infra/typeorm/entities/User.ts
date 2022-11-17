import Account from '@modules/account/infra/typeorm/entities/Account';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('users')
export default class User extends DefaultEntity implements IUserDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
