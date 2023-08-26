import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(async function (fastify, opts) {
  fastify.register(cors, {
    origin: [`${process.env.SITE_URL}`, `${process.env.ADMIN_URL}`],
    methods: 'GET,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
  });
});
