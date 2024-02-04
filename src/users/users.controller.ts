import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from './dtos/user-register.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async register(
    @Body()
    registerDto: UserRegisterDto,
  ) {
    const user = await this.userService.register(registerDto);
    delete user.password;
    return user;
  }
}
