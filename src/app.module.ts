import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import dbConfig from './config/db.config';
import { SeedingDbModule } from './db/seeding_db.module';
import { FileModule } from './resources/file/file.module';
import { LoggerModule } from 'nestjs-pino';
import LoggerConfig from './logger/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig()),
    LoggerModule.forRoot({
      pinoHttp: new LoggerConfig(process.env.LEVEL_LOGGER).config(),
    }),

    AuthModule,
    BoardsModule,
    TasksModule,
    UsersModule,
    SeedingDbModule,
    AuthModule,
    FileModule.register(),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
