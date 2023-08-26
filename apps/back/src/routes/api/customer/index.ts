import bcrypt from 'bcryptjs';
import { ICustomer } from 'mhz-types';

import Customer from '../../../models/customer.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const { data, total } = await paginate(Customer, {
        page: request.query.page,
        sort: request.query.sort,
        dir: request.query.dir,
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: ICustomer }>('/', async function (request, reply) {
    try {
      const customer = new Customer(request.body);
      const hashedPassword = await bcrypt.hash(customer.password, 10);

      customer.password = hashedPassword;

      await customer.save();

      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
