import { Types } from 'mongoose';
import { IProduct } from 'mhz-types';

import Product from '../../../models/product.js';

import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { deleteFile, paginate, decodeToken, addProductToWatched, getProductFilters } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', async function (request, reply) {
    try {
      const { data, total } = await paginate(Product, {
        ...request.query,
        populate: [
          { path: 'category', select: '_id title' },
          { path: 'manufacturer', select: '_id title' },
        ],
        select: '-description -fields -imageUrls -__v',
      });

      const filters = await getProductFilters(request.query, false);

      reply.code(200).send({ data, total, filters });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Querystring: { _id: string; initiator: 'category' | 'manufacturer' } }>(
    '/price',
    async function (request, reply) {
      try {
        const defaultMinAndMaxPrice = await Product.aggregate([
          { $match: { [request.query.initiator]: new Types.ObjectId(request.query._id) } },
          { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } },
          { $project: { _id: 0, price: ['$min', '$max'] } },
        ]);

        reply.code(200).send(defaultMinAndMaxPrice[0].price);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Querystring: { _id: string; initiator: 'category' | 'manufacturer' } }>(
    '/filters',
    async function (request, reply) {
      try {
        const filters = await getProductFilters(
          {
            [request.query.initiator]: request.query._id,
            initiator: request.query.initiator,
          },
          true
        );

        reply.code(200).send(filters);
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.get<{ Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      const product = await Product.findOne({ _id: request.params.id })
        .populate([
          { path: 'category', select: '_id title' },
          { path: 'manufacturer', select: '_id title logoUrl country' },
        ])
        .exec();

      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      if (user?._id && user?.role === 'customer' && product?._id) {
        addProductToWatched(user._id, product._id);

        product.views = product.views ? product.views + 1 : 1;

        await product.save();
      }

      reply.code(200).send(product);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.patch<{ Body: IProduct; Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        await Product.findOneAndUpdate({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });
        reply.code(200).send({ message: 'updated' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );

  fastify.post<{ Body: IProduct }>('/', { preValidation: [fastify.onlyManager] }, async function (request, reply) {
    try {
      const product = new Product(request.body);

      await product.save();
      reply.code(201).send({ message: 'created' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.delete<{ Params: { id: string } }>(
    '/:id',
    { preValidation: [fastify.onlyManager] },
    async function (request, reply) {
      try {
        const product = await Product.findOneAndDelete({ _id: request.params.id });

        product?.imageUrls.forEach((image) => {
          deleteFile(image);
        });

        product?.thumbUrls?.forEach((thumb) => {
          deleteFile(thumb);
        });

        await product?.deleteOne();

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
