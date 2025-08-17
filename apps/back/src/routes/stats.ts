import { API_STATS_COUNT, type IEntitiesReply } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { countService } from '../services/stats.js';
import { statsCountSchema } from '../schemas/stats.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Reply: { 200: IEntitiesReply } }>(
    API_STATS_COUNT,
    { preValidation: [fastify.onlyManager], ...statsCountSchema },
    async function (_request, reply) {
      const count = await countService.count();

      reply.code(200).send(count);
    }
  );
}
