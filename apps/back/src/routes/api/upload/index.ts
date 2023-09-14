import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';

import { IFastifyInstance } from '../../../interface/index.js';
import { createThumb, deleteFile, resizeFile } from '../../../helpers/index.js';

const pump = util.promisify(pipeline);

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Querystring: { width: string; thumb: boolean } }>(
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

          if (request.query.width) filename = await resizeFile(filename, request.query.width);
          if (request.query.thumb) await createThumb(filename);

          filesToUpload.push(filename);
        }
        reply.code(200).send(filesToUpload);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Querystring: { width: string; thumb: boolean } }>(
    '/single',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const file = await request.file();

        if (!file) return;

        let filename = `${Date.now()}-${file.filename}`;

        await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

        if (request.query.width) filename = await resizeFile(filename, request.query.width);
        if (request.query.thumb) await createThumb(filename);

        reply.code(200).send(filename);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string }; Querystring: { thumb: boolean } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        deleteFile(request.params.id);

        if (request.query.thumb) deleteFile(`thumb-${request.params.id}.webp`);

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
