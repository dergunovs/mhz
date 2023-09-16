import { ISearchResults } from 'mhz-types';

import { searchService } from '../services/search.js';
import { IFastifyInstance } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string; isAdmin: boolean }; Reply: { 200: ISearchResults } }>(
    '/search',
    async function (request, reply) {
      const results = await searchService.search(request.query.search, request.query.isAdmin);

      reply.code(200).send(results);
    }
  );
}
