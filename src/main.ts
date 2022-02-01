import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fmp from 'fastify-multipart';
import { Logger } from 'nestjs-pino';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

dotenv.config();

const PORT = process.env.PORT;
const USE_FASTIFY = process.env.USE_FASTIFY;

class Platform {
  readonly port: string | number;
  readonly useFastify: boolean;

  constructor(port: string | number, useFastify: string) {
    this.port = port;
    this.useFastify = useFastify === 'true';
  }

  private async _express() {
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(this.port, () =>
      console.log(`Express server running on port: ${this.port}`),
    );
  }

  private async _fastify() {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    await app.register(fmp);

    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(this.port, '0.0.0.0', () =>
      console.log(`Fastify server running on port: ${this.port}`),
    );
  }

  start() {
    return this.useFastify ? this._fastify() : this._express();
  }
}

const bootstrap = new Platform(PORT, USE_FASTIFY);

bootstrap.start();
