import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';
import { Answer } from './answer.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  question: string;

  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question, { cascade: true })
  answers: Answer[];
}
