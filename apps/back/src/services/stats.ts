import type { IEntitiesReply } from 'mhz-contracts';

import Category from '../models/category.js';
import Manufacturer from '../models/manufacturer.js';
import Manager from '../models/manager.js';
import Customer from '../models/customer.js';
import Order from '../models/order.js';

import Product from '../models/product.js';

import { IStatsService } from '../interface/index.js';

export const countService: IStatsService = {
  count: async () => {
    const count: IEntitiesReply = {
      base: { labels: ['Categories', 'Manufacturers', 'Managers', 'Customers', 'Orders'], datasets: [{ data: [] }] },
      categories: { labels: [], datasets: [{ data: [] }] },
      manufacturers: { labels: [], datasets: [{ data: [] }] },
    };

    const [categoriesCount, manufacturersCount, managersCount, customersCount, ordersCount] = await Promise.all([
      Category.estimatedDocumentCount(),
      Manufacturer.estimatedDocumentCount(),
      Manager.estimatedDocumentCount(),
      Customer.estimatedDocumentCount(),
      Order.estimatedDocumentCount(),
    ]);

    count.base.datasets[0].data.push(categoriesCount, manufacturersCount, managersCount, customersCount, ordersCount);

    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { _id: 0 } },
      { $project: { _id: '$category._id', label: '$category.title', count: 1 } },
    ]);

    for (const category of categories) {
      count.categories.labels.push(category.label);
      count.categories.datasets[0].data.push(category.count);
    }

    const manufacturersAgg = await Product.aggregate([
      { $group: { _id: '$manufacturer', count: { $sum: 1 } } },
      { $lookup: { from: 'manufacturers', localField: '_id', foreignField: '_id', as: 'manufacturer' } },
      { $unwind: '$manufacturer' },
      { $project: { _id: 0 } },
      { $project: { _id: '$manufacturer._id', label: '$manufacturer.title', count: 1 } },
    ]);

    for (const manufacturer of manufacturersAgg) {
      count.manufacturers.labels.push(manufacturer.label);
      count.manufacturers.datasets[0].data.push(manufacturer.count);
    }

    return count;
  },
};
