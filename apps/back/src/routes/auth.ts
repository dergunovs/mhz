import { API_AUTH_CHECK, API_AUTH_LOGIN, API_AUTH_SETUP } from 'mhz-contracts';
import type { ILoginData, IUserToken, IBaseReply, ISignUpData } from 'mhz-contracts';

import { IFastifyInstance } from '../interface/index.js';
import { authService } from '../services/auth.js';
import { userRoleSchema, userTokenSchema, loginDataSchema, signUpDataSchema } from '../schemas/auth.js';

const schema = { tags: ['Auth'] };

export default async function (fastify: IFastifyInstance) {
  fastify.addSchema(userRoleSchema);
  fastify.addSchema(userTokenSchema);
  fastify.addSchema(loginDataSchema);
  fastify.addSchema(signUpDataSchema);

  fastify.get<{ Reply: { 200: IBaseReply } }>(API_AUTH_CHECK, { schema }, async function (request, reply) {
    await authService.check(request);

    return reply.code(200).send({ message: 'Auth checked' });
  });

  fastify.post<{ Body: ILoginData; Reply: { 200: IUserToken; '4xx': IBaseReply } }>(
    API_AUTH_LOGIN,
    { schema },
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

  fastify.post<{ Body: ISignUpData; Reply: { 201: IBaseReply; '5xx': IBaseReply } }>(
    API_AUTH_SETUP,
    { schema },
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
