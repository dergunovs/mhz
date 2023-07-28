import path from 'path';
import { fileURLToPath } from 'url';

import fp from 'fastify-plugin';
import staticF from '@fastify/static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default fp(async function (fastify, opts) {
  console.log(path.join(__dirname, '../public'));
  fastify.register(staticF, { root: path.join(__dirname, '../../public') });
});
