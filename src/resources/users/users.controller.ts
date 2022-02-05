import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeOrmFilter } from 'src/Exceptions/typeOrm.exception';
import { LoggerGuard } from 'src/logger/logger.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guadr';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('/users')
@UseGuards(JwtAuthGuard)
@UseGuards(LoggerGuard)
@UseFilters(TypeOrmFilter)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':userId')
  getOneUser(@Param('userId') userId: string) {
    return this.usersService.getOneUser(userId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':userId')
  changeUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.changeUser(userId, updateUserDto);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    return this.usersService.deleteUser(userId);
  }
}
