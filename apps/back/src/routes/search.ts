import { searchService } from '../services/search.js';
import { IFastifyInstance } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string; isAdmin: boolean } }>('/search', async function (request, reply) {
    try {
      const results = await searchService.search(request.query.search, request.query.isAdmin);

      reply.code(200).send(results);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
