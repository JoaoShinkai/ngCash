import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1668541451308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'username',
            type: 'varchar'
          },
          {
            name: 'password',
            type: 'varchar'
          },
          {
            name: 'account_id',
            type: 'integer'
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
            name: 'users_accounts_fk',
            referencedTableName: 'accounts',
            referencedColumnNames: ['id'],
            columnNames: ['account_id']
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'users_accounts_fk');

    await queryRunner.dropTable('users');
  }
}
