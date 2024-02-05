import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizzesController } from './quizzes.controller';

@Module({
  providers: [QuizzesService],
  imports: [TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
