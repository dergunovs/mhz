import { IManufacturer } from 'mhz-types';

import Manufacturer from '../../../models/manufacturer.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { deleteFile, paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', async function (request, reply) {
    try {
      const { data, total } = await paginate(Manufacturer, {
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
      const manufacturer = await Manufacturer.findOne({ _id: request.params.id }).lean().exec();

      reply.code(200).send(manufacturer);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: IManufacturer; Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await Manufacturer.findOneAndUpdate({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });
        reply.code(200).send({ message: 'updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: IManufacturer }>('/', { preValidation: [fastify.onlyManager] }, async function (request, reply) {
    try {
      const manufacturer = new Manufacturer(request.body);

      await manufacturer.save();
      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const manufacturer = await Manufacturer.findOne({ _id: request.params.id });

        deleteFile(manufacturer?.logoUrl);

        await manufacturer?.deleteOne();

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
