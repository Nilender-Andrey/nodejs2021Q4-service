import { Module } from '@nestjs/common';

import { AuthModule } from './resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BoardsController } from './resources/boards/boards.controller';
import { BoardsModule } from './resources/boards/boards.module';
import appConfig from './config/app.config';
import { BoardsService } from './resources/boards/boards.service';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';

ConfigModule.forRoot();

const environment = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${environment}`],
      load: [appConfig],
      isGlobal: true,
    }),

    AuthModule,
    BoardsModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class AppModule {}
