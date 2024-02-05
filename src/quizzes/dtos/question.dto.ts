import { ApiProperty } from '@nestjs/swagger';
import { AnswerDto } from './answer-dto';

export class QuestionDto {
  @ApiProperty()
  question: string;
  @ApiProperty()
  answers: AnswerDto[];
}
