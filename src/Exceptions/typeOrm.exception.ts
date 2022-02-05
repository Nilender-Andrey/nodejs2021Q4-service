import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    let message: string = exception.message;

    const customResponse = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
      error: 'Database Error',
    };
    const response = host.switchToHttp().getResponse();

    process.env.USE_FASTIFY === 'true'
      ? response.code(customResponse.statusCode).send(customResponse)
      : response.status(customResponse.statusCode).json(customResponse);
  }
}
