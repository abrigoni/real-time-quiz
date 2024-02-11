import { Module } from '@nestjs/common';
import { QuizzesService } from './services/quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizzesController } from './quizzes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from '../users/users.module';
import { QuizzesParticipationService } from './services/quizzes-participation.service';
import { QuizParticipation } from './entities/quiz-participation.entity';
import { Answer } from './entities/answer.entity';
import { Question } from './entities/question.entity';

@Module({
  providers: [QuizzesService, QuizzesParticipationService],
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Quiz, QuizParticipation, Answer, Question]),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_URL],
        },
      },
    ]),
  ],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
