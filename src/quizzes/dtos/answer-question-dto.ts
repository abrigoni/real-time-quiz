import { ApiProperty } from '@nestjs/swagger';

export class AnswerQuestionDto {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  answerId: string;
}
