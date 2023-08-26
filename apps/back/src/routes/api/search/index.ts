import Product from '../../../models/product.js';
import Category from '../../../models/category.js';
import Manufacturer from '../../../models/manufacturer.js';
import Manager from '../../../models/manager.js';

import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string } }>('/', async function (request, reply) {
    try {
      let results = {};

      const regex = new RegExp(request.query.search, 'i');

      await Promise.all([
        await Product.find({ title: regex }).lean().exec(),
        await Category.find({ title: regex }).lean().exec(),
        await Manufacturer.find({ title: regex }).lean().exec(),
        await Manager.find({ $or: [{ email: regex }, { firstName: regex }, { lastName: regex }] })
          .lean()
          .exec(),
      ]).then(([products, categories, manufacturers, managers]) => {
        results = { products, categories, manufacturers, managers };
      });

      reply.code(200).send(results);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
