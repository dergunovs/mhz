import { ICategory, ICustomer, IManager, IManufacturer, IOrder, IProduct, ISearchResults } from 'mhz-types';

import Product from '../models/product.js';
import Category from '../models/category.js';
import Manufacturer from '../models/manufacturer.js';
import Manager from '../models/manager.js';
import Customer from '../models/customer.js';
import Order from '../models/order.js';

export const searchService = {
  search: async (search: string, isAdmin: boolean) => {
    let results: ISearchResults = {};

    const regex = new RegExp(search, 'i');

    async function findProducts() {
      const products: IProduct[] = await Product.find({ title: regex }).select('title').lean().exec();

      return products;
    }

    async function findCategories() {
      const categories: ICategory[] = await Category.find({ title: regex }).select('title').lean().exec();

      return categories;
    }

    async function findManufacturers() {
      const manufacturers: IManufacturer[] = await Manufacturer.find({ title: regex }).select('title').lean().exec();

      return manufacturers;
    }

    async function findManagers() {
      const managers: IManager[] = await Manager.find({
        $or: [{ email: regex }, { firstName: regex }, { lastName: regex }],
      })
        .select('firstName lastName')
        .lean()
        .exec();

      return managers;
    }

    async function findCustomers() {
      const customers: ICustomer[] = await Customer.find({
        $or: [{ email: regex }, { firstName: regex }, { lastName: regex }],
      })
        .select('firstName lastName')
        .lean()
        .exec();

      return customers;
    }

    async function findOrders() {
      const orders: IOrder[] = await Order.aggregate([
        { $addFields: { convertedId: { $toString: '$_id' } } },
        { $match: { convertedId: { $regex: search, $options: 'i' } } },
        { $project: { convertedId: 0, status: 0, products: 0, customer: 0, dateCreated: 0, __v: 0 } },
      ]);

      return orders;
    }

    await Promise.all(
      isAdmin
        ? [findProducts(), findCategories(), findManufacturers(), findManagers(), findCustomers(), findOrders()]
        : [findProducts(), findCategories(), findManufacturers()]
    ).then(([products, categories, manufacturers, managers, customers, orders]) => {
      results = { products, categories, manufacturers, managers, customers, orders };
    });

    return results;
  },
};
