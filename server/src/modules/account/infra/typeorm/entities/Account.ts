import { IAccountDTO } from '@modules/account/dtos/IAccountDTO';
import DefaultEntity from '@shared/infra/typeorm/entities/DefaultEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export default class Account extends DefaultEntity implements IAccountDTO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;
}
