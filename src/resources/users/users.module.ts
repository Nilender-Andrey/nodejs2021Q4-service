import { AuthModule } from './../auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import User from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],

  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  exports: [UsersService],
})
export class UsersModule {}
