import { API_UPLOAD, API_UPLOAD_SINGLE } from 'mhz-contracts';
import type { IBaseReply } from 'mhz-contracts';

import { uploadService } from '../services/upload.js';
import { IFastifyInstance } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Querystring: { width: string; thumb: boolean }; Reply: { 200: string[] } }>(
    API_UPLOAD,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const filesToUpload = await uploadService.uploadMultiple(request.files, request.query.width, request.query.thumb);

      reply.code(200).send(filesToUpload);
    }
  );

  fastify.post<{ Querystring: { width: string; thumb: boolean }; Reply: { 200: string; '5xx': IBaseReply } }>(
    API_UPLOAD_SINGLE,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const { filename, isFileExists } = await uploadService.uploadSingle(
        request.file,
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

  fastify.delete<{ Params: { id: string }; Querystring: { thumb: boolean }; Reply: { 200: IBaseReply } }>(
    `${API_UPLOAD}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await uploadService.delete(request.params.id, request.query.thumb);

      reply.code(200).send({ message: 'File deleted' });
    }
  );
}
