import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthorizationDataDto } from './dto/authorization_data.dto';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { LoggerGuard } from 'src/logger/logger.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('/login')
@UseGuards(LoggerGuard)
export class AuthController {
  constructor(
    private authService: AuthService,
    @InjectPinoLogger(AuthController.name)
    private readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Authorization page' })
  @Get()
  loginPage() {
    return `From here, I'll give you the login page someday...`;
  }

  @ApiOperation({ summary: 'User authorization' })
  @ApiResponse({ status: 201, description: 'token' })
  @Post()
  login(@Body() authorizationDataDto: AuthorizationDataDto) {
    this.logger.info(
      `User authorization request "${authorizationDataDto.login}"`,
    );
    return this.authService.login(authorizationDataDto);
  }
}
