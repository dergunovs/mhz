import User from '../../../models/user.js';
import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
    try {
      const users = await User.find().sort('-date_created').lean().exec();
      reply.code(200).send(users);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
