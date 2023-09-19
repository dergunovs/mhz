import type { IEntitiesCount } from 'mhz-contracts';

import Product from '../models/product.js';
import Category from '../models/category.js';
import Manufacturer from '../models/manufacturer.js';
import Manager from '../models/manager.js';
import Customer from '../models/customer.js';
import Order from '../models/order.js';

export const countService = {
  count: async () => {
    let count = {};

    await Promise.all([
      await Product.estimatedDocumentCount(),
      await Category.estimatedDocumentCount(),
      await Manufacturer.estimatedDocumentCount(),
      await Manager.estimatedDocumentCount(),
      await Customer.estimatedDocumentCount(),
      await Order.estimatedDocumentCount(),
    ]).then(([products, categories, manufacturers, managers, customers, orders]) => {
      count = { products, categories, manufacturers, managers, customers, orders };
    });

    return count as IEntitiesCount;
  },
};
