import {
  API_ORDER,
  type IQuery,
  type IBaseReply,
  type IOrder,
  type TOrderStatus,
  type IBaseParams,
} from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { orderService } from '../services/order.js';
import {
  orderGetManySchema,
  orderGetOneSchema,
  orderUpdateSchema,
  orderCreateSchema,
  orderDeleteSchema,
} from '../schemas/order.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: IOrder[]; total?: number } } }>(
    API_ORDER,
    { preValidation: [fastify.onlyLoggedIn], ...orderGetManySchema },
    async function (request, reply) {
      const { data, total } = await orderService.getMany<IOrder>(
        request.query,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: IOrder | null }; '4xx': IBaseReply } }>(
    `${API_ORDER}/:id`,
    { preValidation: [fastify.onlyLoggedIn], ...orderGetOneSchema },
    async function (request, reply) {
      const { data, isOrderNotBelongToCustomer } = await orderService.getOne<IOrder>(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isOrderNotBelongToCustomer) {
        reply.code(403).send({ message: 'Forbidden' });
      } else {
        reply.code(200).send({ data });
      }
    }
  );

  fastify.patch<{
    Body: { status: TOrderStatus };
    Params: IBaseParams;
    Reply: { 200: IBaseReply; '4xx': IBaseReply; '5xx': IBaseReply };
  }>(
    `${API_ORDER}/:id`,
    { preValidation: [fastify.onlyLoggedIn], ...orderUpdateSchema },
    async function (request, reply) {
      const isPaymentError = await orderService.update<IOrder>(
        undefined,
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization,
        request.body.status
      );

      if (isPaymentError) {
        reply.code(403).send({ message: 'Payment error' });
      } else {
        reply.code(200).send({ message: 'Order updated' });
      }
    }
  );

  fastify.post<{ Reply: { 201: string; '4xx': IBaseReply } }>(
    API_ORDER,
    { preValidation: [fastify.onlyCustomer], ...orderCreateSchema },
    async function (request, reply) {
      const id = await orderService.create<IOrder>(undefined, fastify.jwt.decode, request.headers.authorization);

      if (id) {
        reply.code(201).send(id.toString());
      } else {
        reply.code(404).send({ message: 'No such customer' });
      }
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply } }>(
    `${API_ORDER}/:id`,
    { preValidation: [fastify.onlyManager], ...orderDeleteSchema },
    async function (request, reply) {
      await orderService.delete(request.params.id);

      reply.code(200).send({ message: 'Order deleted' });
    }
  );
}
