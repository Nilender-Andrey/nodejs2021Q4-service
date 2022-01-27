import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import User from '../users/users.model';
import { UsersService } from '../users/users.service';
import { AuthorizationDataDto } from './dto/authorization_data.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authorizationDataDto: AuthorizationDataDto) {
    const user = await this.isValidPassword(authorizationDataDto);

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { id: user.id, login: user.login };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async isValidPassword(authorizationDataDto: AuthorizationDataDto) {
    const user = await this.usersService.getLoginUser(
      authorizationDataDto.login,
    );

    if (user) {
      const passwordEquals = await bcrypt.compare(
        authorizationDataDto.password,
        user.password,
      );

      if (passwordEquals) {
        return user;
      }
    }

    throw new UnauthorizedException({
      message: `User with the given username and password was not found`,
    });
  }
}
