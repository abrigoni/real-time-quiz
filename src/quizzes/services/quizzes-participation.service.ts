import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizParticipation } from '../entities/quiz-participation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuizzesParticipationService {
  constructor(
    @InjectRepository(QuizParticipation)
    private quizzesParticipationrepository: Repository<QuizParticipation>,
  ) {}

  create(userId: string, quizId: string) {
    return this.quizzesParticipationrepository.save({ userId, quizId });
  }
}
