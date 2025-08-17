import {
  API_CUSTOMER,
  API_CUSTOMER_CURRENT,
  API_CUSTOMER_CART,
  API_CUSTOMER_FAVOURITES,
  API_CUSTOMER_WATCHED,
  type IQuery,
  type IBaseReply,
  type ICartItem,
  type ICustomer,
  type IProduct,
  type ISignUpData,
  type IBaseParams,
} from 'mhz-contracts';

import { customerService } from '../services/customer.js';
import { IFastifyInstance } from '../interface/index.js';
import {
  customerGetManySchema,
  customerGetOneSchema,
  customerGetCurrentSchema,
  customerGetCartSchema,
  customerGetWatchedSchema,
  customerGetFavouritesSchema,
  customerUpdateSchema,
  customerUpdateCartSchema,
  customerCreateSchema,
  customerAddToCartSchema,
  customerCreteFavouriteSchema,
  customerDeleteSchema,
  customerDeleteFavouriteSchema,
  customerDeleteFromCartSchema,
} from '../schemas/customer.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery; Reply: { 200: { data: ICustomer[]; total?: number } } }>(
    API_CUSTOMER,
    { preValidation: [fastify.onlyManager], ...customerGetManySchema },
    async function (request, reply) {
      const { data, total } = await customerService.getMany<ICustomer>(request.query);

      reply.code(200).send({ data, total });
    }
  );

  fastify.get<{ Params: IBaseParams; Reply: { 200: { data: ICustomer | null } } }>(
    `${API_CUSTOMER}/:id`,
    { preValidation: [fastify.onlyManager], ...customerGetOneSchema },
    async function (request, reply) {
      const data = await customerService.getOne<ICustomer>(request.params.id);

      reply.code(200).send(data);
    }
  );

  fastify.get<{ Reply: { 200: ICustomer | null } }>(
    API_CUSTOMER_CURRENT,
    { preValidation: [fastify.onlyCustomer], ...customerGetCurrentSchema },
    async function (request, reply) {
      const customer = await customerService.getCurrent(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(customer);
    }
  );

  fastify.get<{ Reply: { 200: ICartItem[] } }>(
    API_CUSTOMER_CART,
    { preValidation: [fastify.onlyCustomer], ...customerGetCartSchema },
    async function (request, reply) {
      const cart = await customerService.getCart(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(cart);
    }
  );

  fastify.get<{ Reply: { 200: IProduct[] } }>(
    API_CUSTOMER_WATCHED,
    { preValidation: [fastify.onlyCustomer], ...customerGetWatchedSchema },
    async function (request, reply) {
      const products = await customerService.getWatchedProducts(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(products);
    }
  );

  fastify.get<{ Reply: { 200: IProduct[] } }>(
    API_CUSTOMER_FAVOURITES,
    { preValidation: [fastify.onlyCustomer], ...customerGetFavouritesSchema },
    async function (request, reply) {
      const products = await customerService.getFavouriteProducts(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(products);
    }
  );

  fastify.patch<{ Body: ICustomer; Reply: { 200: IBaseReply } }>(
    API_CUSTOMER,
    { preValidation: [fastify.onlyCustomer], ...customerUpdateSchema },
    async function (request, reply) {
      await customerService.update<ICustomer>(
        request.body,
        undefined,
        fastify.jwt.decode,
        request.headers.authorization
      );

      reply.code(200).send({ message: 'Customer updated' });
    }
  );

  fastify.patch<{ Body: { _id: string; count: string }; Reply: { 200: IBaseReply; '5xx': IBaseReply } }>(
    API_CUSTOMER_CART,
    { preValidation: [fastify.onlyCustomer], ...customerUpdateCartSchema },
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

  fastify.post<{ Body: ISignUpData; Reply: { 201: IBaseReply } }>(
    '/customer',
    customerCreateSchema,
    async function (request, reply) {
      await customerService.create<ISignUpData>(request.body);

      reply.code(201).send({ message: 'Customer created' });
    }
  );

  fastify.post<{ Body: { _id: string | string[] }; Reply: { 201: IBaseReply } }>(
    API_CUSTOMER_CART,
    { preValidation: [fastify.onlyCustomer], ...customerAddToCartSchema },
    async function (request, reply) {
      await customerService.addToCart(request.body._id, fastify.jwt.decode, request.headers.authorization);

      reply.code(201).send({ message: 'Added to cart' });
    }
  );

  fastify.post<{ Body: { id: string }; Reply: { 201: IBaseReply; '5xx': IBaseReply } }>(
    API_CUSTOMER_FAVOURITES,
    { preValidation: [fastify.onlyCustomer], ...customerCreteFavouriteSchema },
    async function (request, reply) {
      const { isReachedLimit, isAlreadyExists } = await customerService.createFavourite(
        request.body.id,
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
    { preValidation: [fastify.onlyCustomer], ...customerDeleteSchema },
    async function (request, reply) {
      await customerService.delete(undefined, fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send({ message: 'Customer deleted' });
    }
  );

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply; '5xx': IBaseReply } }>(
    `${API_CUSTOMER_FAVOURITES}/:id`,
    { preValidation: [fastify.onlyCustomer], ...customerDeleteFavouriteSchema },
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

  fastify.delete<{ Params: IBaseParams; Reply: { 200: IBaseReply; '5xx': IBaseReply } }>(
    `${API_CUSTOMER_CART}/:id`,
    { preValidation: [fastify.onlyCustomer], ...customerDeleteFromCartSchema },
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
