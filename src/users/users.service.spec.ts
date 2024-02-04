import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRegisterDto } from './dtos/user-register.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dtos/user-login.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let userService: UsersService;
  let jwtService: JwtService;
  const repository = {
    save: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: repository,
        },
        JwtService,
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be proper initialized', () => {
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  it('should register an user successfully', async () => {
    const userMockDto: UserRegisterDto = {
      email: 'john@doe.com',
      username: 'john.doe',
      password: 'Passw0rd!',
    };
    const response = {
      id: 'uuid-generated-mock',
      email: userMockDto.email,
      username: 'john.doe',
      password: 'hashed_password',
    };
    repository.save.mockReturnValue(response);
    const res = await userService.register(userMockDto);
    expect(res).toEqual(response);
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(response.password).not.toEqual(userMockDto.password);
  });

  it('should return null on user not found', async () => {
    repository.findOne.mockReturnValue(null);
    const res = await userService.findUserByEmail('email@test.com');
    expect(repository.findOne).toHaveBeenCalledTimes(1);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { email: 'email@test.com' },
    });
    expect(res).toBeNull();
  });

  it('should return false on wrong credentials', async () => {
    const payload: UserLoginDto = {
      email: 'john@doe.com',
      password: 'Passw0rd!',
    };
    const mockUser = {
      id: 'uuid',
      email: payload.email,
      password: 'hashed_password',
      username: 'john.doe',
      beforeInsert: jest.fn(),
    };
    repository.findOne.mockReturnValue(mockUser);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => false);

    // @TODO: common but improve typing
    const res = await userService.login(
      mockUser as unknown as User,
      'Passw0rd!',
    );

    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('Passw0rd!', 'hashed_password');
    expect(res).toEqual(false);
  });

  it('should return true on valid credentials', async () => {
    const payload: UserLoginDto = {
      email: 'john@doe.com',
      password: 'Passw0rd!',
    };
    const mockUser = {
      id: 'uuid',
      email: payload.email,
      password: 'hashed_password',
      username: 'john.doe',
      beforeInsert: jest.fn(),
    };
    repository.findOne.mockReturnValue(mockUser);

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);

    // @TODO: common but improve typing
    const res = await userService.login(
      mockUser as unknown as User,
      'Passw0rd!',
    );

    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledWith('Passw0rd!', 'hashed_password');
    expect(res).toEqual(true);
  });
});
