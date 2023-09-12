import { TOrderStatus } from 'mhz-types';

import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { paginate, decodeToken } from '../../../helpers/index.js';

import Order from '../../../models/order.js';
import Customer from '../../../models/customer.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.onlyLoggedIn] }, async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      const filter = user?.role === 'customer' ? { customer: user._id } : {};

      const { data, total } = await paginate(Order, {
        ...request.query,
        ...filter,
        populate: [{ path: 'customer', select: 'firstName lastName' }],
        select: '-products',
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

        const order = await Order.findOne({ _id: request.params.id })
          .populate([
            { path: 'customer', select: 'firstName lastName' },
            { path: 'products.product', select: '_id title' },
          ])
          .lean()
          .exec();

        const isOrderNotBelongToCustomer =
          user?.role === 'customer' && order?.customer?._id?.toString() !== user?._id.toString();

        if (isOrderNotBelongToCustomer) {
          reply.code(403).send({ message: 'forbidden' });
        } else {
          reply.code(200).send(order);
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post('/', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      const customer = await Customer.findOne({ _id: user?._id })
        .populate([{ path: 'cart.product', select: '_id price' }])
        .exec();

      if (!customer) return;

      const order = new Order({
        products: customer.cart,
        customer: { _id: customer._id },
        price: customer.cart?.reduce((acc, item) => acc + item.count * item.product.price, 0),
      });

      await order.save();

      customer.cart = [];
      customer.orders?.push(order);

      await customer.save();
      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: { status: TOrderStatus }; Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

        const order = await Order.findOne({ _id: request.params.id }).exec();

        const isOrderNotBelongToCustomer =
          user?.role === 'customer' &&
          order?.customer?._id?.toString() !== user?._id.toString() &&
          request.body.status !== 'cancelled';

        if (isOrderNotBelongToCustomer) {
          reply.code(403).send({ message: 'forbidden' });
        } else {
          await Order.updateOne({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });
          await order?.save();

          reply.code(200).send({ message: 'updated' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const order = await Order.findOne({ _id: request.params.id });

        await order?.deleteOne();

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
