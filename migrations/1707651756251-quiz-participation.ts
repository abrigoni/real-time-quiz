import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuizParticipation1707651756251 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE quiz_participations(
            id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id uuid NOT NULL,
            quiz_id uuid NOT NULL,
            CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
            CONSTRAINT fk_quiz_id FOREIGN KEY (quiz_id) REFERENCES quizzes(id),
            CONSTRAINT unique_user_participation UNIQUE (user_id, quiz_id)
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE quiz_participations;`);
  }
}
