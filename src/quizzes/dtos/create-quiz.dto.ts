import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class CreateQuizDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  created_by: string;
  @ApiProperty()
  questions: QuestionDto[];
}
