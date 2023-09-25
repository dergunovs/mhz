import { Types } from 'mongoose';
import type { IProductService, IQuery, IUserToken, TInitiator } from 'mhz-contracts';

import Product from '../models/product.js';

import {
  decodeToken,
  paginate,
  getProductFilters,
  addProductToWatched,
  deleteFile,
  addView,
} from '../helpers/index.js';

export const productService: IProductService = {
  getMany: async <T>(query?: IQuery) => {
    const { data, total } = await paginate(Product, {
      ...query,
      populate: [
        { path: 'category', select: 'title' },
        { path: 'manufacturer', select: 'title' },
      ],
      select: '-description -imageUrls',
    });

    const filters = await getProductFilters(query, false);

    return { data: data as T[], total, filters };
  },

  getOne: async <T>(_id: string, decode?: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const product = await Product.findOne({ _id })
      .populate([
        { path: 'category', select: 'title' },
        { path: 'manufacturer', select: 'title logoUrl country' },
      ])
      .exec();

    if (user?._id && user?.role === 'customer' && product?._id) {
      addProductToWatched(user._id, product._id);
    }

    addView(product);

    return { data: product as T };
  },

  getPriceRange: async (_id: string, initiator: TInitiator) => {
    const defaultMinAndMaxPrice: { price: [number, number] }[] = await Product.aggregate([
      { $match: { [initiator]: new Types.ObjectId(_id) } },
      { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } },
      { $project: { _id: 0, price: ['$min', '$max'] } },
    ]);

    return defaultMinAndMaxPrice[0].price;
  },

  getFilters: async (_id: string, initiator: TInitiator) => {
    const filters = await getProductFilters({ [initiator]: _id, initiator }, true);

    return filters;
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Product.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(productToCreate: T) => {
    const product = new Product(productToCreate);

    await product.save();
  },

  delete: async (_id?: string) => {
    const product = await Product.findOne({ _id });

    product?.imageUrls?.forEach((image) => {
      deleteFile(image);
    });

    product?.thumbUrls?.forEach((thumb) => {
      deleteFile(thumb);
    });

    await product?.deleteOne();
  },
};
