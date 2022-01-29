import { Injectable } from '@nestjs/common';
import { pipeline } from 'stream';
import * as fs from 'fs';
import * as fastify from 'fastify';
import * as multer from 'multer';
import * as path from 'path';

@Injectable()
export class FileService {
  getFileExpress(fileName: string, res) {
    const pathToFile = path.join(__dirname, '../../../uploads/', fileName);
    fs.access(pathToFile, fs.constants.F_OK, (err) => {
      if (err) {
        return res.send(`File: "${fileName}" not found`);
      }

      res.sendFile(pathToFile);
    });
  }

  getFileFastify(fileName: string, res: fastify.FastifyReply) {
    const pathToFile = path.join(__dirname, '../../../uploads/', fileName);
    fs.access(pathToFile, fs.constants.F_OK, (err) => {
      if (err) {
        return res.code(404).send(`File: "${fileName}" not found`);
      }
      const stream = fs.createReadStream(pathToFile);
      res.type('multipart/form-data').send(stream);
    });
  }

  async uploadFileFastify(
    req: fastify.FastifyRequest,
    res: fastify.FastifyReply,
  ) {
    const data = await req.file();

    pipeline(
      data.file,
      fs.createWriteStream(`uploads/${data.filename}`),
      (err) => {
        if (err) {
          res.send(err.message);
        } else {
          res.code(200).send(`File: "${data.filename}" saved.`);
        }
      },
    );
  }

  static storage(): multer.StorageEngine {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'uploads');
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    return storage;
  }
}
