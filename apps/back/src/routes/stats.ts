import { IEntitiesCount } from 'mhz-types';

import { IFastifyInstance } from '../interface/index.js';
import { countService } from '../services/stats.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Reply: { 200: IEntitiesCount } }>(
    '/stats/count',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const count = await countService.count();

      reply.code(200).send(count);
    }
  );
}
