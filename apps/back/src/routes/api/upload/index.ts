import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';

import { IFastifyInstance } from '../../../interface/index.js';

const pump = util.promisify(pipeline);

export default async function (fastify: IFastifyInstance) {
  fastify.post('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const files = request.files();

      if (!files) return;

      const filesToUpload = [];

      for await (const file of files) {
        const filename = Date.now() + '-' + file.filename;
        await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

        filesToUpload.push(filename);
      }
      reply.code(200).send(filesToUpload);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
