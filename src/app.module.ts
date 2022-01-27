import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './resources/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BoardsModule } from './resources/boards/boards.module';
import appConfig from './config/app.config';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import dbConfig from './config/db.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SeedingDbModule } from './db/seeding_db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      load: [appConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dbConfig()),

    AuthModule,
    BoardsModule,
    TasksModule,
    UsersModule,
    SeedingDbModule,
    /*  AuthModule, */
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
