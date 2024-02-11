import { Answer } from 'src/quizzes/entities/answer.entity';
import { Question } from 'src/quizzes/entities/question.entity';
import { QuizParticipation } from 'src/quizzes/entities/quiz-participation.entity';
import { Quiz } from 'src/quizzes/entities/quiz.entity';
import { User } from 'src/users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 0),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Quiz, Question, Answer, QuizParticipation],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
