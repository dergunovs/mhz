import bcrypt from 'bcryptjs';

import { IFastifyInstance } from '../../../interface/index.js';
import Manager from '../../../models/manager.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Body: { email: string; password: string } }>('/login', async function (request, reply) {
    const { email, password } = request.body;

    const foundManager = await Manager.findOne({ email });

    if (!foundManager) {
      reply.code(404).send({ message: 'Manager not found' });
      return;
    }

    try {
      const valid = await bcrypt.compare(password, foundManager.password);

      if (!valid) {
        reply.code(401).send({ message: 'Wrong password' });
        return;
      }

      const managerInfo = {
        _id: foundManager._id,
        first_name: foundManager.first_name,
        last_name: foundManager.last_name,
        email: foundManager.email,
      };

      const token = fastify.jwt.sign(managerInfo, { expiresIn: '9h' });
      const manager = { ...managerInfo, token };

      reply.code(200).send(manager);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: { email: string; password: string } }>('/setup', async function (request, reply) {
    const isManagers = !!(await Manager.find()).length;

    if (isManagers) {
      reply.code(500).send({ message: 'Managers already exists' });
      return;
    }

    try {
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
