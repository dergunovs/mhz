import Fastify, { FastifyServerOptions } from 'fastify';

import path from 'path';
import { fileURLToPath } from 'url';

import autoload from '@fastify/autoload';
import { Schema, connect } from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

Schema.Types.Boolean.convertToFalse.add('');
connect(`mongodb://127.0.0.1/${process.env.DATABASE}`);

export type AppOptions = Partial<FastifyServerOptions>;

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options);

  fastify.register(autoload, { dir: path.join(__dirname, 'plugins'), options: Object.assign({}, options) });
  fastify.register(autoload, { dir: path.join(__dirname, 'routes'), options: Object.assign({}, options) });

  return fastify;
}

export { buildApp };
