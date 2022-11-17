import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAccountTable1668535438352 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'accounts',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'balance',
            type: 'decimal(10,2)',
            default: '100'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
            isNullable: false
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('accounts');
  }
}
