import { API_SEARCH } from 'mhz-contracts';
import type { ISearchResults } from 'mhz-contracts';

import { searchService } from '../services/search.js';
import { IFastifyInstance } from '../interface/index.js';
import { searchResultsModel, searchSchema } from '../schemas/search.js';

export default async function (fastify: IFastifyInstance) {
  fastify.addSchema(searchResultsModel);

  fastify.get<{ Querystring: { search: string; isAdmin: boolean }; Reply: { 200: ISearchResults } }>(
    API_SEARCH,
    searchSchema,
    async function (request, reply) {
      const results = await searchService.search(request.query.search, request.query.isAdmin);

      reply.code(200).send(results);
    }
  );
}
