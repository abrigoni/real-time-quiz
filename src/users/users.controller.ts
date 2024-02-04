import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRegisterDto } from './dtos/user-register.dto';
import { UserLoginDto } from './dtos/user-login.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  @ApiCreatedResponse({
    description: 'Successful registration.',
  })
  async register(
    @Body()
    registerDto: UserRegisterDto,
  ) {
    const user = await this.userService.register(registerDto);
    return this.userService.formatUser(user);
  }

  @Post('/login')
  @ApiUnauthorizedResponse({
    description: 'Incorrect email or password',
  })
  @ApiOkResponse({
    description: 'Successful login, followed by user data and JWT',
  })
  async login(
    @Body()
    loginDto: UserLoginDto,
  ) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const validAuth = await this.userService.login(user, loginDto.password);

    if (!validAuth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.userService.formatUser(user);
  }
}
