import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';

import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('/file')
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
