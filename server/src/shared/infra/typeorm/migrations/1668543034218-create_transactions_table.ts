import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTransactionsTable1668543034218
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'debited_account_id',
            type: 'integer'
          },
          {
            name: 'credited_account_id',
            type: 'integer'
          },
          {
            name: 'value',
            type: 'decimal(10,2)'
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
        ],
        foreignKeys: [
          {
            name: 'transactions_account_debited_fk',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['debited_account_id']
          },
          {
            name: 'transactions_account_credited_fk',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['credited_account_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'transactions',
      'transactions_account_credited_fk'
    );

    await queryRunner.dropForeignKey(
      'transactions',
      'transactions_account_debited_fk'
    );

    await queryRunner.dropTable('transactions');
  }
}
