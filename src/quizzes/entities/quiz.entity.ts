import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'quizzes' })
export class Quiz {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  created_by: string;

  @Column()
  title: string;

  @OneToMany(() => Question, (question) => question.quiz, { cascade: true })
  questions: Question[];
}
