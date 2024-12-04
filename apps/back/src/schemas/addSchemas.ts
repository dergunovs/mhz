import type { FastifyInstance } from 'fastify';

import { userRoleModel, userTokenModel, loginDataModel, signUpDataModel } from './auth.js';
import { categoryFieldModel, categoryModel } from './category.js';
import { configurationModel } from './configuration.js';
import { cartItemModel, productWatchedModel, customerModel } from './customer.js';
import { managerModel } from './manager.js';
import { manufacturerModel } from './manufacturer.js';
import { orderModel } from './order.js';
import { bannerModel } from './banner.js';
import { productFilterBaseModel, productFilterFieldModel, productFilterModel, productModel } from './product.js';
import { searchResultModel, searchResultsModel } from './search.js';
import { statsCountModel, datasetModel } from './stats.js';

export function addSchemas(fastify: FastifyInstance) {
  fastify.addSchema(userRoleModel);
  fastify.addSchema(userTokenModel);
  fastify.addSchema(loginDataModel);
  fastify.addSchema(signUpDataModel);

  fastify.addSchema(bannerModel);

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

  fastify.addSchema(datasetModel);
  fastify.addSchema(statsCountModel);
}
