import { IFilterData, IProduct } from 'mhz-types';

import { IBaseReply, IFastifyInstance, IQuery, TInitiator } from '../interface/index.js';
import { productService } from '../services/product.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IProduct[]; total: number; filters: IFilterData } } }>(
    '/product',
    async function (request, reply) {
      const { data, total, filters } = await productService.getMany(request.query);

      reply.code(200).send({ data, total, filters });
    }
  );

  fastify.get<{ Params: { id: string }; Reply: { 200: IProduct | null } }>(
    '/product/:id',
    async function (request, reply) {
      const product = await productService.getOne(request.params.id, fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(product);
    }
  );

  fastify.get<{ Querystring: { _id: string; initiator: TInitiator }; Reply: { 200: [number, number] } }>(
    '/product/price',
    async function (request, reply) {
      const priceRange = await productService.getPriceRange(request.query._id, request.query.initiator);

      reply.code(200).send(priceRange);
    }
  );

  fastify.get<{ Querystring: { _id: string; initiator: TInitiator }; Reply: { 200: IFilterData } }>(
    '/product/filters',
    async function (request, reply) {
      const filters = await productService.getFilters(request.query._id, request.query.initiator);

      reply.code(200).send(filters);
    }
  );

  fastify.patch<{ Body: IProduct; Params: { id: string }; Reply: { 200: IBaseReply } }>(
    '/product/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await productService.update(request.params.id, request.body);

      reply.code(200).send({ message: 'Product updated' });
    }
  );

  fastify.post<{ Body: IProduct; Reply: { 201: IBaseReply } }>(
    '/product',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await productService.create(request.body);

      reply.code(201).send({ message: 'Product created' });
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply } }>(
    '/product/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await productService.delete(request.params.id);

      reply.code(200).send({ message: 'Product deleted' });
    }
  );
}
