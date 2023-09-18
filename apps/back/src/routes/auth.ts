import { API_CHECK_AUTH, API_LOGIN, API_SETUP, authCheckSchema, authLoginSchema, authSetupSchema } from 'mhz-contracts';
import type { TBaseReply, TAuthLoginBody, TAuthLoginReply, TAuthSetupBody } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { authService } from '../services/auth.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Reply: { 200: TBaseReply } }>(API_CHECK_AUTH, authCheckSchema, async function (request, reply) {
    await authService.check(request);

    return reply.code(200).send({ message: 'Auth checked' });
  });

  fastify.post<{ Body: TAuthLoginBody; Reply: { 200: TAuthLoginReply; '4xx': TBaseReply } }>(
    API_LOGIN,
    authLoginSchema,
    async function (request, reply) {
      const { user, isUserNotFound, isWrongPassword } = await authService.login(request.body, fastify.jwt.sign);

      if (isUserNotFound) {
        reply.code(404).send({ message: 'User not found' });
      } else if (isWrongPassword) {
        reply.code(401).send({ message: 'Wrong password' });
      } else {
        reply.code(200).send(user);
      }
    }
  );

  fastify.post<{ Body: TAuthSetupBody; Reply: { 201: TBaseReply; '5xx': TBaseReply } }>(
    API_SETUP,
    authSetupSchema,
    async function (request, reply) {
      const isManagersExists = await authService.setup(request.body);

      if (isManagersExists) {
        reply.code(500).send({ message: 'Managers already exists' });
      } else {
        reply.code(201).send({ message: 'Manager created' });
      }
    }
  );
}
