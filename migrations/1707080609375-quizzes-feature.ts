import { MigrationInterface, QueryRunner } from 'typeorm';

export class Quizzes1707080609375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
                CREATE TABLE quizzes(
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    title varchar(255) UNIQUE NOT NULL,
                    created_by UUID NOT NULL,
                    CONSTRAINT fk_created_by_user FOREIGN KEY (created_by) REFERENCES users(id)
               );
               CREATE TABLE questions(
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    question varchar(255) UNIQUE NOT NULL,
                    quiz_id UUID not null,
                    CONSTRAINT fk_question_quiz FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
               );
               CREATE TABLE answers(
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    answer varchar(255) UNIQUE NOT NULL,
                    question_id UUID NOT NULL,
                    correct boolean NOT NULL,
                    CONSTRAINT fk_answer_question FOREIGN KEY (question_id) REFERENCES questions(id)
               );
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        DROP TABLE quizzes;
        DROP TABLE questions;
        DROP TABLE answers;
        `,
    );
  }
}
