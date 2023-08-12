import bcrypt from 'bcryptjs';

import { IFastifyInstance } from '../../../interface/index.js';
import Manager from '../../../models/manager.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Body: { email: string; password: string } }>('/login', async function (request, reply) {
    try {
      const { email, password } = request.body;

      const foundManager = await Manager.findOne({ email }).lean().exec();

      if (!foundManager) {
        reply.code(404).send({ message: 'Manager not found' });
        return;
      }

      const valid = bcrypt.compare(password, foundManager.password);

      if (!valid) {
        reply.code(401).send({ message: 'Wrong password' });
        return;
      }

      const manager = {
        _id: foundManager._id,
        firstName: foundManager.firstName,
        lastName: foundManager.lastName,
        email: foundManager.email,
      };

      const token = fastify.jwt.sign(manager, { expiresIn: '9h' });

      reply.code(200).send({ ...manager, token });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: { email: string; password: string } }>('/setup', async function (request, reply) {
    try {
      const managers = await Manager.find().lean().exec();

      if (managers.length) {
        reply.code(500).send({ message: 'Managers already exists' });
        return;
      }

      const { email, password } = request.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const manager = new Manager({ email, password: hashedPassword });
      await manager.save();

      reply.code(200).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get('/check', async function (request, reply) {
    try {
      await request.jwtVerify();
      return reply.code(200).send({ message: 'checked' });
    } catch (err) {
      reply.code(403).send({ message: 'Authorization error' });
    }
  });
}
