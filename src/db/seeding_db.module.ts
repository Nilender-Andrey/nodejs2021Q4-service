import { Module } from '@nestjs/common';
import { UsersModule } from 'src/resources/users/users.module';
import { SeedingDbService } from './seeding_db.service';

@Module({
  controllers: [],
  providers: [SeedingDbService],

  imports: [UsersModule],

  exports: [SeedingDbService],
})
export class SeedingDbModule {}
