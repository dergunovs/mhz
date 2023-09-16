import path from 'path';
import { fileURLToPath } from 'url';
import Fastify, { FastifyServerOptions } from 'fastify';
import autoload from '@fastify/autoload';

import { Schema, connect } from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const dirname = path.dirname(fileURLToPath(import.meta.url));

Schema.Types.Boolean.convertToFalse.add('');
connect(`mongodb://127.0.0.1/${process.env.DATABASE}`);

type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);

  fastify.register(autoload, { dir: path.join(dirname, 'plugins'), options: { ...options } });
  fastify.register(autoload, { dir: path.join(dirname, 'routes'), options: { ...options, prefix: '/api' } });

  return fastify;
}

export { buildApp };
export type { AppOptions };
