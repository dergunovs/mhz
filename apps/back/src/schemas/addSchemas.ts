import type { FastifyInstance } from 'fastify';

import { userRoleModel, userTokenModel, loginDataModel, signUpDataModel } from '../schemas/auth.js';
import { categoryFieldModel, categoryModel } from '../schemas/category.js';
import { configurationModel } from '../schemas/configuration.js';
import { cartItemModel, productWatchedModel, customerModel } from '../schemas/customer.js';
import { managerModel } from '../schemas/manager.js';
import { manufacturerModel } from '../schemas/manufacturer.js';
import { orderModel } from '../schemas/order.js';
import {
  productFilterBaseModel,
  productFilterFieldModel,
  productFilterModel,
  productModel,
} from '../schemas/product.js';
import { searchResultModel, searchResultsModel } from '../schemas/search.js';
import { statsCountModel } from '../schemas/stats.js';

export function addSchemas(fastify: FastifyInstance) {
  fastify.addSchema(userRoleModel);
  fastify.addSchema(userTokenModel);
  fastify.addSchema(loginDataModel);
  fastify.addSchema(signUpDataModel);

  fastify.addSchema(categoryFieldModel);
  fastify.addSchema(categoryModel);

  fastify.addSchema(configurationModel);

  fastify.addSchema(cartItemModel);
  fastify.addSchema(productWatchedModel);
  fastify.addSchema(customerModel);

  fastify.addSchema(managerModel);

  fastify.addSchema(manufacturerModel);

  fastify.addSchema(orderModel);

  fastify.addSchema(productFilterBaseModel);
  fastify.addSchema(productFilterFieldModel);
  fastify.addSchema(productFilterModel);
  fastify.addSchema(productModel);

  fastify.addSchema(searchResultModel);
  fastify.addSchema(searchResultsModel);

  fastify.addSchema(statsCountModel);
}
