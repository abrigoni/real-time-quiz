import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dtos/user-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async register({ email, password }: UserRegisterDto) {
    const user = new User();
    user.email = email;
    user.password = password;
    return this.usersRepository.save(user);
  }
}
