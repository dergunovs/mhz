import { IManager } from 'mhz-types';

import { IFastifyInstance, ILoginData } from '../interface/index.js';
import { authService } from '../services/auth.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get('/auth/check', async function (request, reply) {
    try {
      await authService.check(request);

      return reply.code(200).send({ message: 'Auth checked' });
    } catch (err) {
      reply.code(403).send({ message: 'Authorization error' });
    }
  });

  fastify.post<{ Body: ILoginData }>('/auth/login', async function (request, reply) {
    try {
      const { user, isUserNotFound, isWrongPassword } = await authService.login(request.body, fastify.jwt.sign);

      if (isUserNotFound) {
        reply.code(404).send({ message: 'User not found' });
      } else if (isWrongPassword) {
        reply.code(401).send({ message: 'Wrong password' });
      } else {
        reply.code(200).send(user);
      }
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: IManager }>('/auth/setup', async function (request, reply) {
    try {
      const isManagersExists = await authService.setup(request.body);

      if (isManagersExists) {
        reply.code(500).send({ message: 'Managers already exists' });
      } else {
        reply.code(200).send({ message: 'Manager created' });
      }
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
