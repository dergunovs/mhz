import fs from 'fs';
import { Model, PopulateOptions } from 'mongoose';
import path from 'path';
import sharp from 'sharp';

import { IProduct } from 'mhz-types';

import { IUserToken } from '../interface/index.js';
import Customer from '../models/customer.js';

export async function paginate<T>(
  Entity: Model<T>,
  options?: { page?: string; sort?: string; dir?: string; populate?: PopulateOptions[]; filter?: string }
) {
  try {
    const page = Number(options?.page) || 1;
    const sort = options?.sort === undefined ? '-dateCreated' : `${options?.dir === 'desc' ? '-' : ''}${options?.sort}`;

    const filter = options?.filter ? JSON.parse(options?.filter) : {};

    const limit = 12;

    const count = await Entity.find(filter).countDocuments().exec();

    const total = Math.ceil(count / limit);

    const data = await Entity.find()
      .find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(options?.populate || [])
      .select('-password -__v')
      .sort(sort)
      .lean()
      .exec();

    return {
      data,
      total,
    };
  } catch (err) {
    throw err;
  }
}

export function deleteFile(filename?: string) {
  try {
    fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
  } catch (err) {
    throw err;
  }
}

export async function resizeFile(filename: string, width: string) {
  try {
    await sharp(`./public/upload/${filename}`).resize(Number(width)).toFile(`./public/upload/resized-${filename}`);

    deleteFile(filename);

    return `resized-${filename}`;
  } catch (err) {
    throw err;
  }
}

export function decodeToken(decode: (token: string) => IUserToken | null, authorizationHeader?: string) {
  const token = authorizationHeader ? authorizationHeader.split('Bearer ')[1] : undefined;

  return token ? decode(token) : null;
}

export async function addProductToWatched(user: IUserToken | null, product: IProduct | null) {
  if (user?.role === 'customer' && product?._id) {
    const filter = { _id: user._id };
    const limit = 6;

    const currentCustomer = await Customer.findOne(filter).lean().exec();

    const watchedProductsIds = currentCustomer?.watchedProducts?.map((product) => product._id.toString()) || [];

    if (watchedProductsIds.includes(product._id.toString())) return;

    if (currentCustomer?.watchedProducts && product._id) {
      if (currentCustomer.watchedProducts.length === limit) currentCustomer.watchedProducts.pop();

      await Customer.findOneAndUpdate(filter, {
        watchedProducts: [{ _id: product._id.toString(), dateCreated: new Date() }, ...currentCustomer.watchedProducts],
      });
    }
  }
}
