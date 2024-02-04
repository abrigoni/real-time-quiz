import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersAddUsername1707072082791 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN username varchar(255) UNIQUE NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN username;`);
  }
}
