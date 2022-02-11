import { INestApplication } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerConfig = (app: INestApplication | NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('NestJS Task')
    .setDescription('RS School')
    .setVersion('1.0.0')
    .addTag('Documentation REST API')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/doc', app, document);
};

export default swaggerConfig;
