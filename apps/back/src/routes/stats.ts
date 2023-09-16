import { IFastifyInstance } from '../interface/index.js';
import { countService } from '../services/stats.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get('/stats/count', { preValidation: [fastify.onlyManager] }, async function (request, reply) {
    try {
      const count = await countService.count();

      reply.code(200).send(count);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
