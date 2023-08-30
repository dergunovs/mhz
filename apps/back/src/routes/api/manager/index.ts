import bcrypt from 'bcryptjs';
import { IManager } from 'mhz-types';

import Manager from '../../../models/manager.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const { data, total } = await paginate(Manager, {
        page: request.query.page,
        sort: request.query.sort,
        dir: request.query.dir,
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      const manager = await Manager.findOne({ _id: request.params.id }).select('-password -__v').lean().exec();

      reply.code(200).send(manager);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: IManager; Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      await Manager.findOneAndUpdate({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });

      reply.code(200).send({ message: 'updated' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: IManager }>('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const manager = new Manager(request.body);
      const hashedPassword = await bcrypt.hash(manager.password, 10);

      manager.password = hashedPassword;

      await manager.save();

      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.checkAuth] },
    async function (request, reply) {
      try {
        const manager = await Manager.findOne({ _id: request.params.id });

        await manager?.deleteOne();

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
