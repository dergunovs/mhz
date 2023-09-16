import { ICustomer } from 'mhz-types';

import { customerService } from '../services/customer.js';
import { IFastifyInstance, IQuery } from '../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>(
    '/customer',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const { data, total } = await customerService.getMany(request.query);

        reply.code(200).send({ data, total });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Params: { id: string } }>(
    '/customer/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const customer = await customerService.getOne(request.params.id);

        reply.code(200).send(customer);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get('/customer/current', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      const customer = await customerService.getCurrent(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(customer);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get('/customer/cart', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      const cart = await customerService.getCart(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(cart);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get('/customer/watched', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      const products = await customerService.getWatchedProducts(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(products);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get('/customer/favourites', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      const products = await customerService.getFavouriteProducts(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send(products);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: ICustomer }>(
    '/customer',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        await customerService.update(request.body, fastify.jwt.decode, request.headers.authorization);

        reply.code(200).send({ message: 'Customer updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.patch<{ Body: { _id: string; count: string } }>(
    '/customer/cart',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const isProductInCard = await customerService.updateCart(
          request.body._id,
          request.body.count,
          fastify.jwt.decode,
          request.headers.authorization
        );

        if (isProductInCard) {
          reply.code(201).send({ message: 'Cart updated' });
        } else {
          reply.code(500).send({ message: 'No such product in your cart' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: ICustomer }>('/customer', async function (request, reply) {
    try {
      await customerService.create(request.body);

      reply.code(201).send({ message: 'Customer created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: { _id: string | string[] } }>(
    '/customer/cart',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        await customerService.addToCart(request.body._id, fastify.jwt.decode, request.headers.authorization);

        reply.code(201).send({ message: 'Added to cart' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: { _id: string } }>(
    '/customer/favourites',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
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
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete('/customer', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      await customerService.delete(fastify.jwt.decode, request.headers.authorization);

      reply.code(200).send({ message: 'Customer deleted' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/customer/favourites/:id',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
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
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/customer/cart/:id',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const isProductInCard = await customerService.deleteFromCart(
          request.params.id,
          fastify.jwt.decode,
          request.headers.authorization
        );

        if (isProductInCard) {
          reply.code(201).send({ message: 'Product deleted from cart' });
        } else {
          reply.code(500).send({ message: 'No such product in your cart' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
