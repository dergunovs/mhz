import bcrypt from 'bcryptjs';

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
            ? await Manager.findOne({ email }).lean().exec()
            : await Customer.findOne({ email }).lean().exec();

        if (!foundUser) {
          reply.code(404).send({ message: 'User not found' });
          return;
        }

        const valid = bcrypt.compare(password, foundUser.password);

        if (!valid) {
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

        reply.code(200).send({ ...user, token });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

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
