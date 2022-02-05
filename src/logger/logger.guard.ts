import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class LoggerGuard implements CanActivate {
  constructor(private readonly logger: PinoLogger) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const reqId = JSON.stringify(req.id);
      const method = JSON.stringify(req.method);
      const url = JSON.stringify(req.url);
      const body = JSON.stringify(req.body);
      const params = JSON.stringify(req.params);
      const query = JSON.stringify(req.query);

      this.logger.debug(
        `\nreq: {\n reqId: ${reqId},\n method: ${method},\n url ${url},\n params: ${params},\n query: ${query},\n body: ${body}\n}\n`,
      );

      return true;
    } catch (error) {}
  }
}
