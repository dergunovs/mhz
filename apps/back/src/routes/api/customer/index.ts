import bcrypt from 'bcryptjs';
import { ICustomer } from 'mhz-types';

import Customer from '../../../models/customer.js';
import Product from '../../../models/product.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { decodeToken, paginate } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
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

  fastify.get('/current', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
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

  fastify.get<{ Querystring: IQuery }>('/watched', async function (request, reply) {
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
          $project: {
            imageUrls: 1,
            title: 1,
            price: 1,
            category: 1,
            index: { $indexOfArray: [customerProducts, '$_id'] },
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        { $sort: { index: 1 } },
      ]);

      reply.code(200).send(products);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Querystring: IQuery }>('/favourites', async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      const customer = await Customer.findOne({ _id: user?._id })
        .lean()
        .exec();

      const products = await Product.find({ _id: { $in: customer?.favouriteProducts } });

      reply.code(200).send(products);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: { _id: string } }>('/favourites', async function (request, reply) {
    try {
      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);
      const filter = { _id: user?._id };

      const currentCustomer = await Customer.findOne(filter).lean().exec();

      const currentFavourites = currentCustomer?.favouriteProducts?.map((product) => product.toString()) || [];

      if (currentFavourites.includes(request.body._id)) {
        reply.code(500).send({ message: 'Already in your favourites' });
      } else {
        if (currentCustomer?.favouriteProducts) {
          await Customer.findOneAndUpdate(filter, {
            favouriteProducts: [...currentFavourites, request.body._id],
          });
        }

        reply.code(201).send({ message: 'added' });
      }
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

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
