import bcrypt from 'bcryptjs';
import { ICustomer } from 'mhz-types';

import Customer from '../../../models/customer.js';
import Product from '../../../models/product.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { decodeToken, paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.onlyManager] }, async function (request, reply) {
    try {
      const { data, total } = await paginate(Customer, {
        page: request.query.page,
        sort: request.query.sort,
        dir: request.query.dir,
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get('/current', { preValidation: [fastify.onlyCustomer] }, async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      const customer = await Customer.findOne({ _id: user?._id })
        .select('-password -__v')
        .lean()
        .exec();

      reply.code(200).send(customer);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Querystring: IQuery }>(
    '/watched',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

        const customer = await Customer.findOne({ _id: user?._id })
          .lean()
          .exec();

        const customerProducts = customer?.watchedProducts
          ?.sort((a, b) => Number(b.dateCreated) - Number(a.dateCreated))
          .map((product) => product._id);

        const products = await Product.aggregate([
          { $match: { _id: { $in: customerProducts } } },
          {
            $lookup: {
              from: 'categories',
              localField: 'category',
              foreignField: '_id',
              as: 'category',
            },
          },
          { $unwind: '$category' },
          {
            $project: {
              imageUrls: 1,
              title: 1,
              price: 1,
              category: { _id: '$category._id' },
              index: { $indexOfArray: [customerProducts, '$_id'] },
            },
          },
          { $sort: { index: 1 } },
        ]);

        reply.code(200).send(products);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Querystring: IQuery }>(
    '/favourites',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

        const customer = await Customer.findOne({ _id: user?._id })
          .lean()
          .exec();

        const products = await Product.find({ _id: { $in: customer?.favouriteProducts } })
          .select('imageUrls title price category')
          .populate({ path: 'category', select: '_id' })
          .lean()
          .exec();

        reply.code(200).send(products);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: { _id: string } }>(
    '/favourites',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);
        const filter = { _id: user?._id };

        const currentCustomer = await Customer.findOne(filter).exec();

        const currentFavourites = currentCustomer?.favouriteProducts?.map((product) => product.toString()) || [];

        if (currentFavourites.includes(request.body._id)) {
          reply.code(500).send({ message: 'Already in your favourites' });
        } else {
          if (currentCustomer?.favouriteProducts) {
            await Customer.updateOne(filter, { $push: { favouriteProducts: request.body._id } });
            await currentCustomer.save();
          }

          reply.code(201).send({ message: 'added' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/favourites/:id',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);
        const filter = { _id: user?._id };

        const currentCustomer = await Customer.findOne(filter).exec();

        const currentFavourites = currentCustomer?.favouriteProducts?.map((product) => product.toString()) || [];

        if (currentFavourites.includes(request.params.id) && currentCustomer?.favouriteProducts) {
          await Customer.updateOne(filter, {
            favouriteProducts: currentFavourites.filter((product) => product !== request.params.id),
          });

          await currentCustomer.save();

          reply.code(201).send({ message: 'removed' });
        } else {
          reply.code(500).send({ message: 'No such product in your favourites' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Querystring: IQuery }>(
    '/cart',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

        const customer = await Customer.findOne({ _id: user?._id })
          .lean()
          .exec();

        const productIds = customer?.cart?.map((item) => item.product._id);

        const products = await Product.find({ _id: { $in: productIds } })
          .select('imageUrls title price category')
          .populate({ path: 'category', select: '_id title' })
          .lean()
          .exec();

        const cart = products.map((product) => {
          return {
            _id: product._id,
            product,
            count: customer?.cart?.find((item) => item.product._id?.toString() === product._id.toString())?.count,
          };
        });

        reply.code(200).send(cart);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: { _id: string } }>(
    '/cart',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);
        const filter = { _id: user?._id };

        const currentCustomer = await Customer.findOne(filter).exec();

        const currentItems = currentCustomer?.cart?.map((product) => product.product._id?.toString());
        const currentCart = currentCustomer?.cart || [];

        if (currentItems?.includes(request.body._id)) {
          await Customer.updateOne(filter, {
            cart: currentCart.map((item) => {
              return item.product._id?.toString() === request.body._id
                ? { product: item.product, count: item.count + 1 }
                : item;
            }),
          });
        } else {
          await Customer.updateOne(filter, {
            $push: { cart: { product: request.body._id, count: 1 } },
          });
        }

        await currentCustomer?.save();

        reply.code(201).send({ message: 'added' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.patch<{ Body: { _id: string; count: string } }>(
    '/cart',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);
        const filter = { _id: user?._id };

        const currentCustomer = await Customer.findOne(filter).exec();

        const currentItems = currentCustomer?.cart?.map((product) => product.product._id?.toString());
        const currentCart = currentCustomer?.cart || [];

        if (currentItems?.includes(request.body._id)) {
          await Customer.updateOne(filter, {
            cart: currentCart.map((item) => {
              return item.product._id?.toString() === request.body._id
                ? { product: item.product, count: request.body.count }
                : item;
            }),
          });

          await currentCustomer?.save();

          reply.code(201).send({ message: 'updated' });
        } else {
          reply.code(500).send({ message: 'No such product in your cart' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    '/cart/:id',
    { preValidation: [fastify.onlyCustomer] },
    async function (request, reply) {
      try {
        const user = decodeToken(fastify.jwt.decode, request.headers.authorization);
        const filter = { _id: user?._id };

        const currentCustomer = await Customer.findOne(filter).exec();

        const currentItems = currentCustomer?.cart?.map((product) => product.product._id?.toString());
        const currentCart = currentCustomer?.cart || [];

        if (currentItems?.includes(request.params.id)) {
          await Customer.updateOne(filter, {
            cart: currentCart.filter((item) => item.product._id?.toString() !== request.params.id),
          });

          await currentCustomer?.save();

          reply.code(201).send({ message: 'removed' });
        } else {
          reply.code(500).send({ message: 'No such product in your cart' });
        }
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: ICustomer }>('/', async function (request, reply) {
    try {
      const customer = new Customer(request.body);
      const hashedPassword = await bcrypt.hash(customer.password, 10);

      customer.password = hashedPassword;

      await customer.save();

      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
