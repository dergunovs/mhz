import { API_UPLOAD, API_UPLOAD_MULTIPLE, API_UPLOAD_SINGLE } from 'mhz-contracts';
import type { IBaseReply, IBaseParams, IUploadQuery } from 'mhz-contracts';

import { uploadService } from '../services/upload.js';
import { IFastifyInstance } from '../interface/index.js';
import { uploadMultipleSchema, uploadSingleSchema, uploadDeleteSchema } from '../schemas/upload.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Querystring: IUploadQuery; Reply: { 200: string[] } }>(
    API_UPLOAD_MULTIPLE,
    { preValidation: [fastify.onlyManager], ...uploadMultipleSchema },
    async function (request, reply) {
      const files = request.files();

      const filesToUpload = await uploadService.uploadMultiple(files, request.query.width, request.query.thumb);

      reply.code(200).send(filesToUpload);
    }
  );

  fastify.post<{ Querystring: IUploadQuery; Reply: { 200: string; '5xx': IBaseReply } }>(
    API_UPLOAD_SINGLE,
    { preValidation: [fastify.onlyManager], ...uploadSingleSchema },
    async function (request, reply) {
      const file = await request.file();

      const { filename, isFileExists } = await uploadService.uploadSingle(
        file,
        request.query.width,
        request.query.thumb
      );

      if (isFileExists) {
        reply.code(200).send(filename);
      } else {
        reply.code(500).send({ message: 'File upload error' });
      }
    }
  );

  fastify.delete<{ Params: IBaseParams; Querystring: IUploadQuery; Reply: { 200: IBaseReply } }>(
    `${API_UPLOAD}/:id`,
    { preValidation: [fastify.onlyManager], ...uploadDeleteSchema },
    async function (request, reply) {
      await uploadService.delete(request.params.id, request.query.thumb);

      reply.code(200).send({ message: 'File deleted' });
    }
  );
}
