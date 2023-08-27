import { IProduct } from 'mhz-types';

import Product from '../../../models/product.js';
import Customer from '../../../models/customer.js';
import { IFastifyInstance, IQuery } from '../../../interface/index.js';
import { deleteFile, paginate, decodeToken, addProductToWatched } from '../../../helpers/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: IQuery }>('/', async function (request, reply) {
    try {
      const { data, total } = await paginate(Product, {
        page: request.query.page,
        sort: request.query.sort,
        dir: request.query.dir,
        populate: [
          { path: 'category', select: ['_id', 'title'] },
          { path: 'manufacturer', select: ['_id', 'title'] },
        ],
        filter: request.query.filter,
      });

      reply.code(200).send({ data, total });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.get<{ Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      const product = await Product.findOne({ _id: request.params.id })
        .populate([
          { path: 'category', select: ['_id', 'title'] },
          { path: 'manufacturer', select: ['_id', 'title', 'logoUrl', 'country'] },
        ])
        .lean()
        .exec();

      const user = decodeToken(fastify.jwt.decode, request.headers.authorization);

      addProductToWatched(user, product);

      reply.code(200).send(product);
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

  fastify.patch<{ Body: IProduct; Params: { id: string } }>('/:id', async function (request, reply) {
    try {
      await Product.findOneAndUpdate({ _id: request.params.id }, { ...request.body, dateUpdated: new Date() });
      reply.code(200).send({ message: 'updated' });
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });

  fastify.post<{ Body: IProduct }>('/', { preValidation: [fastify.checkAuth] }, async function (request, reply) {
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
    { preValidation: [fastify.checkAuth] },
    async function (request, reply) {
      try {
        const product = await Product.findOneAndDelete({ _id: request.params.id });

        product?.imageUrls.forEach((image) => {
          deleteFile(image);
        });

        await product?.deleteOne();

        reply.code(200).send({ message: 'deleted' });
      } catch (err) {
        reply.code(500).send({ message: err });
      }
    }
  );
}
