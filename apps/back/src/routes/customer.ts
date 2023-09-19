import {
  API_CUSTOMER,
  API_CUSTOMER_CURRENT,
  API_CUSTOMER_CART,
  API_CUSTOMER_FAVOURITES,
  API_CUSTOMER_WATCHED,
} from 'mhz-contracts';
import type { IQuery, IBaseReply, ICartItem, ICustomer, IProduct } from 'mhz-contracts';

import { customerService } from '../services/customer.js';
import { IFastifyInstance } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: ICustomer[]; total: number } } }>(
    API_CUSTOMER,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const { data, total } = await customerService.getMany(request.query);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: { id: string }; Reply: { 200: ICustomer | null } }>(
    `${API_CUSTOMER}/:id`,
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      const customer = await customerService.getOne(request.params.id);

      reply.code(200).send(customer);
    }
  );

  fastify.get<{ Reply: { 200: ICustomer | null } }>(
    API_CUSTOMER_CURRENT,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const customer = await customerService.getCurrent(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(customer);
    }
  );

  fastify.get<{ Reply: { 200: ICartItem[] } }>(
    API_CUSTOMER_CART,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const cart = await customerService.getCart(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(cart);
    }
  );

  fastify.get<{ Reply: { 200: IProduct[] } }>(
    API_CUSTOMER_WATCHED,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const products = await customerService.getWatchedProducts(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(products);
    }
  );

  fastify.get<{ Reply: { 200: IProduct[] } }>(
    API_CUSTOMER_FAVOURITES,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const products = await customerService.getFavouriteProducts(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(products);
    }
  );

  fastify.patch<{ Body: ICustomer; Reply: { 200: IBaseReply } }>(
    API_CUSTOMER,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      await customerService.update(request.body, fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send({ message: 'Customer updated' });
    }
  );

  fastify.patch<{ Body: { _id: string; count: string }; Reply: { 200: IBaseReply; '5xx': IBaseReply } }>(
    API_CUSTOMER_CART,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const isProductInCard = await customerService.updateCart(
        request.body._id,
        request.body.count,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isProductInCard) {
        reply.code(200).send({ message: 'Cart updated' });
      } else {
        reply.code(500).send({ message: 'No such product in your cart' });
      }
    }
  );

  fastify.post<{ Body: ICustomer; Reply: { 201: IBaseReply } }>('/customer', async function (request, reply) {
    await customerService.create(request.body);

    reply.code(201).send({ message: 'Customer created' });
  });

  fastify.post<{ Body: { _id: string | string[] }; Reply: { 201: IBaseReply } }>(
    API_CUSTOMER_CART,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      await customerService.addToCart(request.body._id, fastify.jwt.decode, request.headers.authorization);

      reply.code(201).send({ message: 'Added to cart' });
    }
  );

  fastify.post<{ Body: { _id: string }; Reply: { 201: IBaseReply; '5xx': IBaseReply } }>(
    API_CUSTOMER_FAVOURITES,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const { isReachedLimit, isAlreadyExists } = await customerService.createFavourite(
        request.body._id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isReachedLimit) {
        reply.code(500).send({ message: 'You have reached favourites limit' });
      } else if (isAlreadyExists) {
        reply.code(500).send({ message: 'Already in your favourites' });
      } else {
        reply.code(201).send({ message: 'Added product to favourites' });
      }
    }
  );

  fastify.delete<{ Reply: { 200: IBaseReply } }>(
    API_CUSTOMER,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      await customerService.delete(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send({ message: 'Customer deleted' });
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply; '5xx': IBaseReply } }>(
    `${API_CUSTOMER_FAVOURITES}/:id`,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const isProductExists = await customerService.deleteFavourite(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isProductExists) {
        reply.code(200).send({ message: 'Product removed from favourites' });
      } else {
        reply.code(500).send({ message: 'No such product in your favourites' });
      }
    }
  );

  fastify.delete<{ Params: { id: string }; Reply: { 200: IBaseReply; '5xx': IBaseReply } }>(
    `${API_CUSTOMER_CART}/:id`,
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      const isProductInCard = await customerService.deleteFromCart(
        request.params.id,
        fastify.jwt.decode,
        request.headers.authorization
      );

      if (isProductInCard) {
        reply.code(200).send({ message: 'Product deleted from cart' });
      } else {
        reply.code(500).send({ message: 'No such product in your cart' });
      }
    }
  );
}
