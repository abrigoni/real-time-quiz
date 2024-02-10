import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'answers' })
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @Column({ select: false })
  correct: boolean;

  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: 'question_id' })
  question: Question;
}
