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

    await Promise.all([
      await Category.estimatedDocumentCount(),
      await Manufacturer.estimatedDocumentCount(),
      await Manager.estimatedDocumentCount(),
      await Customer.estimatedDocumentCount(),
      await Order.estimatedDocumentCount(),
    ]).then(([categories, manufacturers, managers, customers, orders]) => {
      count.base.datasets[0].data.push(categories, manufacturers, managers, customers, orders);
    });

    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
      { $unwind: '$category' },
      { $project: { _id: 0 } },
      { $project: { _id: '$category._id', label: '$category.title', count: 1 } },
    ]);

    categories.forEach((category) => {
      count.categories.labels.push(category.label);
      count.categories.datasets[0].data.push(category.count);
    });

    const manufacturers = await Product.aggregate([
      { $group: { _id: '$manufacturer', count: { $sum: 1 } } },
      { $lookup: { from: 'manufacturers', localField: '_id', foreignField: '_id', as: 'manufacturer' } },
      { $unwind: '$manufacturer' },
      { $project: { _id: 0 } },
      { $project: { _id: '$manufacturer._id', label: '$manufacturer.title', count: 1 } },
    ]);

    manufacturers.forEach((manufacturer) => {
      count.manufacturers.labels.push(manufacturer.label);
      count.manufacturers.datasets[0].data.push(manufacturer.count);
    });

    return count;
  },
};
