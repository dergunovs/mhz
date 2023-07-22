import Manager from '../../../models/manager.js';
import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const managers = await Manager.find().sort('-date_created').lean().exec();
      reply.code(200).send(managers);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
