import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const repository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register an user successfully', async () => {
    const userMockDto: UserRegisterDto = {
      email: 'john@doe.com',
      password: 'Passw0rd!',
    };
    const response = {
      id: 'uuid-generated-mock',
      email: userMockDto.email,
      password: userMockDto.password,
    };
    repository.save.mockReturnValue(response);
    const res = await service.register(userMockDto);
    expect(res).toEqual(response);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});
