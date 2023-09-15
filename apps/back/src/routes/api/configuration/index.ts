import { IConfiguration } from 'mhz-types';

import Configuration from '../../../models/configuration.js';

import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { paginate, decodeToken } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.onlyLoggedIn] }, async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      const filter = user?.role === 'customer' ? { customer: user._id } : {};

      const { data, total } = await paginate(Configuration, {
        ...request.query,
        ...filter,
        populate: [{ path: 'customer', select: 'firstName lastName' }],
        select: '-parts',
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      const configuration = await Configuration.findOne({ _id: request.params.id })
        .populate([
          { path: 'customer', select: 'firstName lastName' },
          {
            path: 'parts.CPU',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Case',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Cooler',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.GPU',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Keyboard',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Monitor',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Motherboard',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Mouse',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.Mousepad',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.PSU',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.RAM',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
          {
            path: 'parts.SSD',
            select: 'title price fields category',
            populate: { path: 'category', select: 'title' },
          },
        ])
        .lean()
        .exec();

      if (!configuration) {
        reply.code(404).send({ message: 'not found' });

        return;
      }

      const isEditable = configuration?.customer?._id?.toString() === user?._id;

      const isSharable = isEditable || configuration?.isShared;

      if (isSharable) {
        reply.code(200).send({ configuration, isEditable });
      } else {
        reply.code(403).send({ message: 'forbidden' });
      }
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: IConfiguration; Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        await Configuration.findOneAndUpdate({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });
        reply.code(200).send({ message: 'updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: IConfiguration }>(
    '/',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const configuration = new Configuration(request.body);

        await configuration.save();
        reply.code(201).send({ message: 'created' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyLoggedIn] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

        const configuration = await Configuration.findOne({ _id: request.params.id });

        const isDeletable = user?.role === 'manager' || configuration?.customer?._id?.toString() === user?._id;

        if (isDeletable) {
          await configuration?.deleteOne();

          reply.code(200).send({ message: 'deleted' });
        }
        reply.code(403).send({ message: 'forbidden' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
