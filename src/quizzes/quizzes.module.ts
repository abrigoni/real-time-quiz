import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { QuizzesController } from './quizzes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  providers: [QuizzesService],
  imports: [
    TypeOrmModule.forFeature([Quiz]),
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
