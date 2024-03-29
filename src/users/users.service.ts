import { Injectable } from '@nestjs/common';
import { UserRegisterDto } from './dtos/user-register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public formatUser(user: User) {
    delete user.password;
    return user;
  }

  public async register({ email, password, username }: UserRegisterDto) {
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    return this.usersRepository.save(user);
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email: email.toLowerCase() },
    });
  }

  public async getById(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
  public async login(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  public async generateToken(user: User) {
    const payload = { id: user.id, username: user.username, email: user.email };
    return this.jwtService.signAsync(payload);
  }
}
