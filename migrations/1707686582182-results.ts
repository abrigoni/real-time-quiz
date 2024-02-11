import { MigrationInterface, QueryRunner } from 'typeorm';

export class Results1707686582182 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      CREATE TABLE results(
        id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id uuid NOT NULL,
        question_id uuid NOT NULL,
        answer_id uuid NOT NULL,
        points int NOT NULL,
        CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT fk_question_id FOREIGN KEY (question_id) REFERENCES users(id),
        CONSTRAINT fk_answer_id FOREIGN KEY (answer_id) REFERENCES quizzes(id),
         CONSTRAINT unique_user_answer UNIQUE (user_id, question_id, answer_id)
   );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            DROP TABLE results;
        `,
    );
  }
}
