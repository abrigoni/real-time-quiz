import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { QuizzesService } from './services/quizzes.service';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { AuthGuardedRequest } from 'src/types';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { PARTICIPATE_MESSAGE, UserParticipateQuizEvent } from './events';
import { QuizzesParticipationService } from './services/quizzes-participation.service';
import { UsersService } from 'src/users/users.service';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(
    private readonly quizzesService: QuizzesService,
    private readonly quizzesParticipationService: QuizzesParticipationService,
    private readonly usersService: UsersService,
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
  ) {}

  @Post()
  public async create(
    @Body() createQuizDto: CreateQuizDto,
    @Request() request: AuthGuardedRequest,
  ) {
    const { user } = request;
    return this.quizzesService.create(user.id, createQuizDto);
  }

  @Get()
  public async getAllQuizzes() {
    return this.quizzesService.getAll();
  }

  @Get(':id')
  public async getQuizById(@Param('id') id: string) {
    const quiz = await this.quizzesService.getById(id);
    if (!quiz) {
      throw new NotFoundException();
    }
    return quiz;
  }

  @Post(':id/participate')
  public async participate(
    @Param('id') id: string,
    @Request() request: AuthGuardedRequest,
  ) {
    const { user: userData } = request;
    const [user, quiz] = await Promise.all([
      this.usersService.getById(userData.id),
      this.quizzesService.getById(id),
    ]);
    if (!user || !quiz) {
      throw new NotFoundException();
    }

    await this.quizzesParticipationService.create(user.id, quiz.id);
    const message: UserParticipateQuizEvent = {
      userId: user.id,
      quizId: quiz.id,
    };
    this.natsClient.emit({ cmd: PARTICIPATE_MESSAGE }, message);
    return { message: 'Joined quiz successfully!', questions: quiz.questions };
  }
}
