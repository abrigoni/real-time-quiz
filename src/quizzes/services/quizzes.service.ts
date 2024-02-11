import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dtos/create-quiz.dto';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
  ) {}

  public async getAll() {
    return this.quizzesRepository.find();
  }

  public async getById(id: string) {
    return this.quizzesRepository.findOne({
      where: { id },
      relations: ['questions', 'questions.answers'],
    });
  }

  public async create(userId: string, quizDto: CreateQuizDto) {
    const quiz = new Quiz();
    quiz.title = quizDto.title;
    quiz.created_by = userId;

    const questions: Question[] = [];

    for (let i = 0; i < quizDto.questions.length; i++) {
      const { question: questionText, answers: questionAnswers } =
        quizDto.questions[i];
      const question = new Question();
      question.question = questionText;
      question.quiz = quiz;
      // set answers with orm object
      const answers: Answer[] = [];
      for (let j = 0; j < questionAnswers.length; j++) {
        const { answer: answerText, correct } = questionAnswers[j];
        // build answer object
        const answer = new Answer();
        answer.correct = correct;
        answer.answer = answerText;
        answer.question = question;
        answers.push(answer);
      }
      question.answers = answers;
      questions.push(question);
    }
    quiz.questions = questions;

    const quizzes = await this.quizzesRepository.save(quiz);
    return quizzes.id;
  }
}
