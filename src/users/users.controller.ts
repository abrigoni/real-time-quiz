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
import { Public } from '../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Public()
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

  @Public()
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
    let user = await this.userService.findUserByEmail(loginDto.email);
    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const validAuth = await this.userService.login(user, loginDto.password);

    if (!validAuth) {
      throw new UnauthorizedException('Invalid credentials');
    }
    user = this.userService.formatUser(user);
    const accessToken = await this.userService.generateToken(user);
    return {
      user,
      accessToken,
    };
  }
}
