import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';

import { IFastifyInstance } from '../../../interface/index.js';
import { deleteFile, resizeFile } from '../../../helpers/index.js';

const pump = util.promisify(pipeline);

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Querystring: { width: string } }>(
    '/',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const files = request.files();

        if (!files) return;

        const filesToUpload = [];

        for await (const file of files) {
          let filename = `${Date.now()}-${file.filename}`;

          await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

          if (request.query.width) {
            filename = await resizeFile(filename, request.query.width);
          }

          filesToUpload.push(filename);
        }
        reply.code(200).send(filesToUpload);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Querystring: { width: string } }>(
    '/single',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const file = await request.file();

        if (!file) return;

        let filename = `${Date.now()}-${file.filename}`;

        await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

        if (request.query.width) {
          filename = await resizeFile(filename, request.query.width);
        }

        reply.code(200).send(filename);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        deleteFile(request.params.id);

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
