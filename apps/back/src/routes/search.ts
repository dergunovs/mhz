import { API_SEARCH } from 'mhz-contracts';
import type { ISearchResults } from 'mhz-contracts';

import { searchService } from '../services/search.js';
import { IFastifyInstance } from '../interface/index.js';
import { searchSchema } from '../schemas/search.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string }; Reply: { 200: ISearchResults } }>(
    API_SEARCH,
    searchSchema,
    async function (request, reply) {
      const results = await searchService.search(
        request.query.search,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send(results);
    }
  );
}
