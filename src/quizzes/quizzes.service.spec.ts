import { Test, TestingModule } from '@nestjs/testing';
import { QuizzesService } from './services/quizzes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';

describe('QuizzesService', () => {
  let service: QuizzesService;
  const repository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzesService,
        {
          provide: getRepositoryToken(Quiz),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<QuizzesService>(QuizzesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
