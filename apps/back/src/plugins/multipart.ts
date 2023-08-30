import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';

export default fp(async function (fastify) {
  fastify.register(multipart, { limits: { fileSize: 10000000 } });
});
