import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUser = {
  id: 'uuid',
  email: 'email@test.com',
};

describe('UsersController', () => {
  let controller: UsersController;
  const service = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(service)
      .compile();
    controller = module.get<UsersController>(UsersController);
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    service.register.mockReturnValue(mockUser);
    const user = await controller.register({
      email: 'email@test.com',
      username: 'emailtest',
      password: 'Passw0rd',
    });
    expect(service.register).toHaveBeenCalledTimes(1);
    expect(service.register).toHaveBeenCalledWith({
      email: 'email@test.com',
      username: 'emailtest',
      password: 'Passw0rd',
    });
    expect(user).toEqual(mockUser);
  });
});
