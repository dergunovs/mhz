import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify, { FastifyServerOptions } from 'fastify';
import autoload from '@fastify/autoload';
import { Schema, connect } from 'mongoose';
import dotenv from 'dotenv';

import { addSchemas } from './schemas/addSchemas.js';

dotenv.config({ quiet: true });

const dirname = path.dirname(fileURLToPath(import.meta.url));

Schema.Types.Boolean.convertToFalse.add('');
connect(`mongodb://127.0.0.1/${process.env.DATABASE}`);

type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);

  fastify.register(autoload, { dir: path.join(dirname, 'plugins'), options: { ...options } });
  fastify.register(autoload, { dir: path.join(dirname, 'routes'), options: { ...options, prefix: '/api' } });

  fastify.setErrorHandler(function (_error, _request, reply) {
    reply.status(500).send({ message: 'Server error' });
  });

  addSchemas(fastify);

  return fastify;
}

export { buildApp };
export type { AppOptions };
