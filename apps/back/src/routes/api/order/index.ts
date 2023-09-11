import Order from '../../../models/order.js';
import Customer from '../../../models/customer.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { paginate, decodeToken } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.onlyManager] }, async function (request, reply) {
    try {
      const { data, total } = await paginate(Order, {
        ...request.query,
        populate: [{ path: 'customer', select: 'firstName lastName' }],
        select: '-products -__v',
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

        const order = await Order.findOne({ _id: request.params.id }).select('-__v').lean().exec();

        const isOrderNotBelongToCustomer =
          user?.role === 'customer' && order?.customer.toString() !== user?._id.toString();

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

      const customer = await Customer.findOne({ _id: user?._id }).exec();

      if (!customer) return;

      const order = new Order({ products: customer.cart, customer: { _id: customer._id } });

      await order.save();

      customer.cart = [];
      customer.orders?.push(order);

      await customer.save();
      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
