import { Schema } from 'mongoose';
import { IUserToken } from 'mhz-contracts';

import Customer from '../models/customer.js';

export async function addProductToWatched(user: IUserToken, productId: string | Schema.Types.ObjectId) {
  const filter = { _id: user._id };
  const limit = 8;

  const currentCustomer = await Customer.findOne(filter).exec();

  const watchedProductsIds = currentCustomer?.watchedProducts?.map((watched) => watched.product._id?.toString()) || [];

  if (watchedProductsIds.includes(productId.toString())) return;

  if (currentCustomer?.watchedProducts) {
    if (currentCustomer.watchedProducts.length === limit) {
      await Customer.updateOne(filter, { $pop: { watchedProducts: -1 } });
    }

    await Customer.updateOne(filter, {
      $push: { watchedProducts: { product: productId, dateCreated: new Date() } },
    });
  }

  await currentCustomer?.save();
}
