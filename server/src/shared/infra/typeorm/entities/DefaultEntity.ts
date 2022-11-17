import IDefaultDTO from '@shared/dtos/IDefaultDTO';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default class DefaultEntity implements IDefaultDTO {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date | undefined;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date | undefined;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date | undefined;
}
