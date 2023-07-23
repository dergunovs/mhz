import Manufacturer from '../../../models/manufacturer.js';
import { IFastifyInstance } from '../../../interface/index.js';
import { IManufacturer } from 'mhz-types';

export default async function (fastify: IFastifyInstance) {
  fastify.get('/', async function (request, reply) {
    try {
      const manufacturers = await Manufacturer.find().sort('-date_created').lean().exec();
      reply.code(200).send(manufacturers);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: IManufacturer }>('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const manufacturer = new Manufacturer(request.body);
      await manufacturer.save();
      reply.code(201).send({ message: 'ok' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.checkAuth] },
    async function (request, reply) {
      try {
        await Manufacturer.findOneAndDelete({ _id: request.params.id });
        reply.code(200).send({ message: 'ok' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
