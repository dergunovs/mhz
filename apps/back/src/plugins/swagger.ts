import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import dotenv from 'dotenv';

dotenv.config();

export default fp(async function (fastify) {
  fastify.register(swagger, {
    swagger: {
      info: { title: '9000 Mhz swagger', version: '1.0.13' },
      externalDocs: { url: 'https://github.com/dergunovs/mhz', description: '9000 Mhz on Github' },
      host: 'localhost:5000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  if (process.env.IS_DEV) {
    fastify.register(swaggerUi, {
      routePrefix: '/api-docs',
      uiConfig: { docExpansion: 'list' },
    });
  }
});
