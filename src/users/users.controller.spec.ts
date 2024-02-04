import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockUser = {
  id: 'uuid',
  username: 'emailtest',
  email: 'email@test.com',
  password: 'hashed_password',
};

describe('UsersController', () => {
  let controller: UsersController;
  const service = {
    register: jest.fn(),
    formatUser: jest.fn(),
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
    const payload = {
      email: 'email@test.com',
      username: 'emailtest',
      password: 'Passw0rd',
    };
    service.register.mockReturnValue(mockUser);
    const formattedUserMock = {
      email: mockUser.email,
      username: mockUser.username,
      id: mockUser.id,
    };
    service.formatUser.mockReturnValue(formattedUserMock);
    const userResponse = await controller.register(payload);
    // first methods with payload
    expect(service.register).toHaveBeenCalledTimes(1);
    expect(service.register).toHaveBeenCalledWith(payload);
    // call format with user from service
    expect(service.formatUser).toHaveBeenCalledWith(mockUser);
    expect(userResponse).toEqual(formattedUserMock);
  });
});
