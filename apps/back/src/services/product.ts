import { Types } from 'mongoose';
import { IProduct } from 'mhz-types';

import Product from '../models/product.js';

import { decodeToken, paginate, getProductFilters, addProductToWatched, deleteFile } from '../helpers/index.js';
import { IQuery, IUserToken, TInitiator } from '../interface/index.js';

export const productService = {
  getMany: async (query: IQuery) => {
    const { data, total } = await paginate(Product, {
      ...query,
      populate: [
        { path: 'category', select: '_id title' },
        { path: 'manufacturer', select: '_id title' },
      ],
      select: '-description -imageUrls',
    });

    const filters = await getProductFilters(query, false);

    return { data, total, filters };
  },

  getOne: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const product = await Product.findOne({ _id })
      .populate([
        { path: 'category', select: '_id title' },
        { path: 'manufacturer', select: '_id title logoUrl country' },
      ])
      .exec();

    if (user?._id && user?.role === 'customer' && product?._id) {
      addProductToWatched(user._id, product._id);

      product.views = product.views ? product.views + 1 : 1;

      await product.save();
    }

    return product as IProduct;
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

  update: async (_id: string, productToUpdate: IProduct) => {
    await Product.findOneAndUpdate({ _id }, { ...productToUpdate, dateUpdated: new Date() });
  },

  create: async (productToCreate: IProduct) => {
    const product = new Product(productToCreate);

    await product.save();
  },

  delete: async (_id: string) => {
    const product = await Product.findOne({ _id });

    product?.imageUrls.forEach((image) => {
      deleteFile(image);
    });

    product?.thumbUrls?.forEach((thumb) => {
      deleteFile(thumb);
    });

    await product?.deleteOne();
  },
};
