import type { ISearchResult, ISearchResults, ISearchService } from 'mhz-contracts';

import Product from '../models/product.js';
import Category from '../models/category.js';
import Manufacturer from '../models/manufacturer.js';
import Manager from '../models/manager.js';
import Customer from '../models/customer.js';
import Order from '../models/order.js';

export const searchService: ISearchService = {
  search: async (search: string, isAdmin: boolean) => {
    let results: ISearchResults = {
      products: [],
      categories: [],
      manufacturers: [],
      managers: [],
      customers: [],
      orders: [],
    };

    const regex = new RegExp(search, 'i');

    async function findProducts() {
      const products: ISearchResult[] = await Product.find({ title: regex }).select('title').lean().exec();

      return products;
    }

    async function findCategories() {
      const categories: ISearchResult[] = await Category.find({ title: regex }).select('title').lean().exec();

      return categories;
    }

    async function findManufacturers() {
      const manufacturers: ISearchResult[] = await Manufacturer.find({ title: regex }).select('title').lean().exec();

      return manufacturers;
    }

    async function findManagers() {
      const managers: ISearchResult[] = await Manager.find({
        $or: [{ email: regex }, { firstName: regex }, { lastName: regex }],
      })
        .select('firstName lastName')
        .lean()
        .exec();

      return managers;
    }

    async function findCustomers() {
      const customers: ISearchResult[] = await Customer.find({
        $or: [{ email: regex }, { firstName: regex }, { lastName: regex }],
      })
        .select('firstName lastName')
        .lean()
        .exec();

      return customers;
    }

    async function findOrders() {
      const orders: ISearchResult[] = await Order.aggregate([
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
