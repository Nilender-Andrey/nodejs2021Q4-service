import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],

  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET_KEY}` || 'TEST',
    }),
  ],

  exports: [AuthService, JwtModule],
})
export class AuthModule {}
