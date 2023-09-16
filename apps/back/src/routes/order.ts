import { TOrderStatus } from 'mhz-types';

import { IFastifyInstance, IQuery } from '../interface/index.js';
import { orderService } from '../services/order.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>(
    '/order',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      const { data, total } = await orderService.getMany(
        request.query,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: { id: string } }>(
    '/order/:id',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      const { order, isOrderNotBelongToCustomer } = await orderService.getOne(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isOrderNotBelongToCustomer) {
        reply.code(403).send({ message: 'Forbidden' });
      } else {
        reply.code(200).send(order);
      }
    }
  );

  fastify.patch<{ Body: { status: TOrderStatus }; Params: { id: string } }>(
    '/order/:id',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      const { isOrderNotBelongToCustomer, isAlreadyPaid } = await orderService.update(
        request.params.id,
        request.body.status,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isOrderNotBelongToCustomer) {
        reply.code(403).send({ message: 'Forbidden' });
      } else if (isAlreadyPaid) {
        reply.code(500).send({ message: 'Order already have been paid' });
      } else {
        reply.code(200).send({ message: 'Order updated' });
      }
    }
  );

  fastify.post('/order', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    const { id, isCustomerExists } = await orderService.create(fastify.jwt.decode, request.headers.authorization);

    if (isCustomerExists) {
      reply.code(201).send({ id });
    } else {
      reply.code(404).send({ message: 'No such customer' });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/order/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      await orderService.delete(request.params.id);

      reply.code(200).send({ message: 'Order deleted' });
    }
  );
}
