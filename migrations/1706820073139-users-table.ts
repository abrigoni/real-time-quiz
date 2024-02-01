import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersTable1706820073139 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users(
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                email varchar(255) UNIQUE NOT NULL,
                password varchar(255) NOT NULL
            );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users;`);
  }
}
