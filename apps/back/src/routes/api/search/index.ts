import Product from '../../../models/product.js';
import Category from '../../../models/category.js';
import Manufacturer from '../../../models/manufacturer.js';
import Manager from '../../../models/manager.js';
import Customer from '../../../models/customer.js';
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

    try {
      await Promise.all(
        request.query.isAdmin
          ? [findProducts(), findCategories(), findManufacturers(), findManagers(), findCustomers()]
          : [findProducts(), findCategories(), findManufacturers()]
      ).then(([products, categories, manufacturers, managers, customers]) => {
        results = { products, categories, manufacturers, managers, customers };
      });

      reply.code(200).send(results);
    } catch (err) {
      reply.code(500).send({ message: err });
    }
  });
}
