import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

import dotenv from 'dotenv';

dotenv.config();

export default fp(async function (fastify) {
  fastify.register(swagger, {
    swagger: {
      info: { title: '9000 Mhz swagger', version: '1.0.12' },
      externalDocs: { url: 'https://github.com/dergunovs/mhz', description: '9000 Mhz on Github' },
      host: 'localhost:5000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        token: { type: 'apiKey', name: 'Authorization', in: 'header' },
      },
    },
  });

  if (process.env.IS_DEV) {
    fastify.register(swaggerUi, {
      routePrefix: '/api-docs',
      uiConfig: {
        docExpansion: 'list',
        defaultModelsExpandDepth: 0,
        tryItOutEnabled: true,
      },
    });
  }
});
