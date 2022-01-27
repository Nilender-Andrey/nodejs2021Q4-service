import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { UsersService } from 'src/resources/users/users.service';

@Injectable()
export class SeedingDbService implements OnApplicationBootstrap {
  constructor(private usersService: UsersService) {}

  async onApplicationBootstrap() {
    await this.addAdmin();
  }

  async addAdmin() {
    const admin = await this.usersService.getLoginUser('admin');

    if (!admin) {
      const admin = { name: 'admin', login: 'admin', password: 'admin' };
      await this.usersService.createUser(admin);
    }
  }
}
