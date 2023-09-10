import bcrypt from 'bcryptjs';
import { IManager } from 'mhz-types';

import { IUserToken, IFastifyInstance, TUserRole } from '../../../interface/index.js';
import Manager from '../../../models/manager.js';
import Customer from '../../../models/customer.js';

export default async function (fastify: IFastifyInstance) {
  fastify.post<{ Body: { email: string; password: string; role: TUserRole } }>(
    '/login',
    async function (request, reply) {
      try {
        const { email, password } = request.body;

        const foundUser =
          request.body.role === 'manager'
            ? await Manager.findOne({ email }).exec()
            : await Customer.findOne({ email }).exec();

        if (!foundUser) {
          reply.code(404).send({ message: 'User not found' });

          return;
        }

        const isValid = await bcrypt.compare(password, foundUser.password);

        if (!isValid) {
          reply.code(401).send({ message: 'Wrong password' });

          return;
        }

        const user: IUserToken = {
          _id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          role: request.body.role,
        };

        const token = fastify.jwt.sign(user, { expiresIn: '9h' });

        foundUser.dateLoggedIn = new Date();
        await foundUser.save();

        reply.code(200).send({ ...user, token });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: IManager }>('/setup', async function (request, reply) {
    try {
      const managers = await Manager.find().lean().exec();

      if (managers.length) {
        reply.code(500).send({ message: 'Managers already exists' });

        return;
      }

      const manager = new Manager(request.body);

      manager.password = await bcrypt.hash(manager.password, 10);

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
