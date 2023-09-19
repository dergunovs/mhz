import { API_PRODUCT, API_PRODUCT_FILTERS, API_PRODUCT_PRICE_RANGE } from 'mhz-contracts';
import type { IQuery, TInitiator, IBaseReply, IFilterData, IProduct, IBaseParams } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { productService } from '../services/product.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IProduct[]; total?: number; filters?: IFilterData } } }>(
    API_PRODUCT,
    async function (request, reply) {
      const { data, total, filters } = await productService.getMany<IProduct>(request.query);

      reply.code(200).send({ data, total, filters });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IProduct | null } } }>(
    `${API_PRODUCT}/:id`,
    async function (request, reply) {
      const data = await productService.getOne<IProduct>(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Querystring: { _id: string; initiator: TInitiator }; Reply: { 200: [number, number] } }>(
    API_PRODUCT_PRICE_RANGE,
    async function (request, reply) {
      const priceRange = await productService.getPriceRange(request.query._id, request.query.initiator);

      reply.code(200).send(priceRange);
    }
  );

  fastify.get<{ Querystring: { _id: string; initiator: TInitiator }; Reply: { 200: IFilterData } }>(
    API_PRODUCT_FILTERS,
    async function (request, reply) {
      const filters = await productService.getFilters(request.query._id, request.query.initiator);

      reply.code(200).send(filters);
    }
  );

  fastify.patch<{ Body: IProduct; Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_PRODUCT}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await productService.update<IProduct>(request.body, request.params.id);

      reply.code(200).send({ message: 'Product updated' });
    }
  );

  fastify.post<{ Body: IProduct; Reply: { 201: IBaseReply } }>(
    API_PRODUCT,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await productService.create<IProduct>(request.body);

      reply.code(201).send({ message: 'Product created' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_PRODUCT}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await productService.delete(request.params.id);

      reply.code(200).send({ message: 'Product deleted' });
    }
  );
}
