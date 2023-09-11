import Product from '../../../models/product.js';
import Category from '../../../models/category.js';
import Manufacturer from '../../../models/manufacturer.js';
import Manager from '../../../models/manager.js';
import Customer from '../../../models/customer.js';
import Order from '../../../models/order.js';

import { IFastifyInstance } from '../../../interface/index.js';

export default async function (fastify: IFastifyInstance) {
  fastify.get<{ Querystring: { search: string; isAdmin: boolean } }>('/', async function (request, reply) {
    let results = {};

    const regex = new RegExp(request.query.search, 'i');

    async function findProducts() {
      const products = await Product.find({ title: regex }).select('title').lean().exec();

      return products;
    }

    async function findCategories() {
      const categories = await Category.find({ title: regex }).select('title').lean().exec();

      return categories;
    }

    async function findManufacturers() {
      const manufacturers = await Manufacturer.find({ title: regex }).select('title').lean().exec();

      return manufacturers;
    }

    async function findManagers() {
      const managers = await Manager.find({ $or: [{ email: regex }, { firstName: regex }, { lastName: regex }] })
        .select('firstName lastName')
        .lean()
        .exec();

      return managers;
    }

    async function findCustomers() {
      const customers = await Customer.find({ $or: [{ email: regex }, { firstName: regex }, { lastName: regex }] })
        .select('firstName lastName')
        .lean()
        .exec();

      return customers;
    }

    async function findOrders() {
      const orders = await Order.aggregate([
        { $addFields: { convertedId: { $toString: '$_id' } } },
        { $match: { convertedId: { $regex: request.query.search, $options: 'i' } } },
        { $project: { convertedId: 0, status: 0, products: 0, customer: 0, dateCreated: 0, __v: 0 } },
      ]);

      return orders;
    }

    try {
      await Promise.all(
        request.query.isAdmin
          ? [findProducts(), findCategories(), findManufacturers(), findManagers(), findCustomers(), findOrders()]
          : [findProducts(), findCategories(), findManufacturers()]
      ).then(([products, categories, manufacturers, managers, customers, orders]) => {
        results = { products, categories, manufacturers, managers, customers, orders };
      });

      reply.code(200).send(results);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
