// eslint-disable-next-line import-x/named
import { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

import type { IUserToken } from 'mhz-contracts';

export default fp(async function (fastify) {
  const secret = process.env.SECRET;

  if (!secret) return;

  fastify.register(jwt, { secret });

  fastify.decorate('onlyManager', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const user: IUserToken = await request.jwtVerify();

      if (user.role !== 'manager') reply.code(403).send({ message: 'Authentication error' });
    } catch {
      reply.code(403).send({ message: 'Authentication error' });
    }
  });

  fastify.decorate('onlyCustomer', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      const user: IUserToken = await request.jwtVerify();

      if (user.role !== 'customer') reply.code(403).send({ message: 'Authentication error' });
    } catch {
      reply.code(403).send({ message: 'Authentication error' });
    }
  });

  fastify.decorate('onlyLoggedIn', async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch {
      reply.code(403).send({ message: 'Authentication error' });
    }
  });
});
