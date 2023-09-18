import { IManager } from 'mhz-types';

import { IFastifyInstance } from '../interface/index.js';
import { authService } from '../services/auth.js';
import {
  TAuthLoginBody,
  TAuthLoginResponse,
  TAuthSetupBody,
  authCheckSchema,
  authLoginSchema,
  authSetupSchema,
} from '../schemas/auth.js';
import { TBaseResponse } from '../schemas/base.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Reply: { 200: TBaseResponse } }>('/auth/check', authCheckSchema, async function (request, reply) {
    await authService.check(request);

    return reply.code(200).send({ message: 'Auth checked' });
  });

  fastify.post<{ Body: TAuthLoginBody; Reply: { 200: TAuthLoginResponse; '4xx': TBaseResponse } }>(
    '/auth/login',
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

  fastify.post<{ Body: IManager; Reply: { 201: TAuthSetupBody; '5xx': TBaseResponse } }>(
    '/auth/setup',
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
