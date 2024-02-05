import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty()
  answer: string;

  @ApiProperty()
  correct: boolean;
}
