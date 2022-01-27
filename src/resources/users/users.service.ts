import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import User from './users.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();

    return users;
  }

  async getOneUser(userId: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user)
      throw new NotFoundException(`User id:${userId} received from the base`);

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    let applicant = await this.getLoginUser(createUserDto.login);

    if (applicant)
      throw new HttpException('Login busy', HttpStatus.BAD_REQUEST);

    const newUser = new User();
    newUser.name = createUserDto.name;
    newUser.login = createUserDto.login;
    newUser.password = await bcrypt.hash(createUserDto.password, 10);

    await this.userRepository.save(newUser);

    return newUser;
  }

  async changeUser(userId: string, updateUserDto: UpdateUserDto) {
    let user = await this.getOneUser(userId);

    user.name = updateUserDto.name || user.name;
    user.login = updateUserDto.login || user.login;
    user.password = updateUserDto.password
      ? await await bcrypt.hash(updateUserDto.password, 10)
      : user.password;

    await this.userRepository.save(user);

    user = await this.getOneUser(userId);

    return user;
  }

  async deleteUser(userId: string) {
    const user = await this.getOneUser(userId);
    await this.userRepository.remove(user);

    return { message: `User id:${userId} has been removed` };
  }

  async getLoginUser(login: string) {
    const user = await this.userRepository.findOne({ login });

    return user;
  }
}
