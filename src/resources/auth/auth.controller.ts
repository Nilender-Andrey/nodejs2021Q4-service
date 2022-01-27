import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizationDataDto } from './dto/authorization_data.dto';

@Controller('/login')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  loginPage() {
    return `From here, I'll give you the login page someday...`;
  }
  @Post()
  login(@Body() authorizationDataDto: AuthorizationDataDto) {
    return this.authService.login(authorizationDataDto);
  }
}
