import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'quiz_participations' })
export class QuizParticipation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id' })
  quizId: string;

  @Column({ name: 'user_id' })
  userId: string;
}
