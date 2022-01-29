import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import * as fastify from 'fastify';
import { JwtAuthGuard } from '../auth/jwt-auth.guadr';

@Controller('/file')
//@UseGuards(JwtAuthGuard)
export class FileControllerFastify {
  constructor(private fileService: FileService) {}

  @Get(':fileName')
  getFileFastify(
    @Param('fileName') fileName: string,
    @Res() res: fastify.FastifyReply,
  ) {
    return this.fileService.getFileFastify(fileName, res);
  }

  @Post()
  async uploadFileFastify(
    @Req() req: fastify.FastifyRequest,
    @Res() res: fastify.FastifyReply,
  ) {
    return this.fileService.uploadFileFastify(req, res);
  }
}
