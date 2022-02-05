import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly logger: PinoLogger,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token)
        throw new UnauthorizedException({ message: 'User not authorized' });

      const user = this.jwtService.verify(token);
      req.user = user;
      return true;
    } catch (error) {
      const reqId = JSON.stringify(req.id);

      this.logger.warn(
        `\nres: {\n reqId: ${reqId}, \n statusCode: "401",\n message: "User not authorized"\n}`,
      );
      throw new UnauthorizedException({ message: 'User not authorized' });
    }
  }
}
