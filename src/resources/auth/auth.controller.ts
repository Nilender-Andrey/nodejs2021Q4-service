import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizationDataDto } from './dto/authorization_data.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

@Controller('/login')
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectPinoLogger(AuthController.name)
    private readonly logger: PinoLogger,
  ) {}

  @Get()
  loginPage() {
    return `From here, I'll give you the login page someday...`;
  }
  @Post()
  login(@Body() authorizationDataDto: AuthorizationDataDto) {
    this.logger.info(
      `User authorization request "${authorizationDataDto.login}"`,
    );
    return this.authService.login(authorizationDataDto);
  }
}
