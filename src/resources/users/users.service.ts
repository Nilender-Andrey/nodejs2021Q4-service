import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async getAllUsers() {
    return 'All';
  }
  async getOneUser(id: string) {
    return id;
  }

  async createUser(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  async changeUser(id: string) {
    return id;
  }
  async deleteUser(id: string) {
    return id;
  }
}
