import { API_STATS_COUNT } from 'mhz-contracts';
import type { IEntitiesCount } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { countService } from '../services/stats.js';

const schema = { tags: ['Stats'] };

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Reply: { 200: IEntitiesCount } }>(
    API_STATS_COUNT,
    { preValidation: [fastify.onlyManager], schema },
    async function (request, reply) {
      const count = await countService.count();

      reply.code(200).send(count);
    }
  );
}
