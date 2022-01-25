import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BoardsController } from './resources/boards/boards.controller';
import { BoardsModule } from './resources/boards/boards.module';
import appConfig from './config/app.config';
import { BoardsService } from './resources/boards/boards.service';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import dbConfig from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig()),

    AuthModule,
    BoardsModule,
    TasksModule,
    UsersModule,
  ],
  controllers: [
    /* BoardsController */
  ],
  providers: [
    /* BoardsService */
  ],
})
export class AppModule {}
