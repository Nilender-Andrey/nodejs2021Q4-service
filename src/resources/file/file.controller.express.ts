import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guadr';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Files')
@Controller('/file')
//@UseGuards(JwtAuthGuard)
export class FileControllerExpress {
  constructor(private fileService: FileService) {}

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string, @Res() res) {
    return this.fileService.getFileExpress(fileName, res);
  }

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: FileService.storage(),
    }),
  )
  uploadFile(@UploadedFiles() file, @Res() res) {
    return res.send(`File: "${file[0].originalname}" saved`);
  }
}
