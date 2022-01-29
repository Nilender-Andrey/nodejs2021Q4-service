import { DynamicModule, Module } from '@nestjs/common';
import { FileControllerExpress } from './file.controller.express';
import { FileControllerFastify } from './file.controller.fastify';
import { FileService } from './file.service';

@Module({})
export class FileModule {
  static register(): DynamicModule {
    return {
      module: FileModule,
      controllers: [
        process.env.USE_FASTIFY === 'true'
          ? FileControllerFastify
          : FileControllerExpress,
      ],
      providers: [FileService],
    };
  }
}
