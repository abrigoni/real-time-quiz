import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dtos/create-quiz.dto';
import { AuthGuardedRequest } from 'src/types';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  public async create(
    @Body() createQuizDto: CreateQuizDto,
    @Request() request: AuthGuardedRequest,
  ) {
    const user = request.user;
    return this.quizzesService.create(user.id, createQuizDto);
  }

  @Get()
  public async getAllQuizzes() {
    return this.quizzesService.getAll();
  }

  @Get(':id')
  public async getQuizById(@Param('id') id: string) {
    return this.quizzesService.getById(id);
  }
}
