import fs from 'fs';
import path from 'path';
import { Model, PopulateOptions, Schema, Types } from 'mongoose';
import sharp from 'sharp';

import { IFilterData } from 'mhz-types';

import { IUserToken } from '../interface/index.js';
import Customer from '../models/customer.js';
import Product from '../models/product.js';

export async function paginate<T>(
  Entity: Model<T>,
  options?: { page?: string; sort?: string; dir?: string; populate?: PopulateOptions[]; filter?: string }
) {
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
}

export function deleteFile(filename?: string) {
  fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
}

export async function resizeFile(filename: string, width: string) {
  await sharp(`./public/upload/${filename}`).resize(Number(width)).toFile(`./public/upload/resized-${filename}`);

  deleteFile(filename);

  return `resized-${filename}`;
}

export async function createThumb(filename: string) {
  await sharp(`./public/upload/${filename}`)
    .resize(480)
    .webp({ quality: 64 })
    .toFile(`./public/upload/thumb-${filename}.webp`);

  return `thumb-${filename}.webp`;
}

export function decodeToken(decode: (token: string) => IUserToken | null, authorizationHeader?: string) {
  const token = authorizationHeader ? authorizationHeader.split('Bearer ')[1] : undefined;

  return token ? decode(token) : null;
}

export async function addProductToWatched(
  userId: string | Schema.Types.ObjectId,
  productId: string | Schema.Types.ObjectId
) {
  const filter = { _id: userId };
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

export async function getProductFilters(filtersRaw?: string) {
  const filter = filtersRaw ? JSON.parse(filtersRaw) : {};

  const filters = await Product.aggregate([
    { $match: { category: new Types.ObjectId(filter.category) } },
    { $unwind: '$fields' },
    {
      $group: {
        _id: { title: '$fields.title', value: '$fields.fieldValue' },
        title: { $first: '$fields.title' },
        fieldType: { $first: '$fields.fieldType' },
        fieldUnits: { $first: '$fields.fieldUnits' },
        fieldValue: { $first: '$fields.fieldValue' },
        count: { $sum: 1 },
      },
    },
    { $project: { _id: 0 } },
  ]);

  const titles = [...new Set(filters.map((item) => item.title))];

  const grouped: IFilterData = {};

  titles.forEach((title) => {
    grouped[title] = {
      fieldUnits: '',
      fieldValues: [],
    };

    filters.forEach((item) => {
      if (item.title === title) {
        grouped[title].fieldUnits = item.fieldUnits;
        grouped[title].fieldValues.push({ value: item.fieldValue, count: item.count });

        grouped[title].fieldValues.sort((a, b) =>
          item.fieldType === 'number'
            ? Number(a.value) - Number(b.value)
            : a.value.toString().localeCompare(b.value.toString())
        );
      }
    });
  });

  const ordered = Object.keys(grouped)
    .sort()
    .reduce((obj: { [key: string]: object }, key) => {
      obj[key] = grouped[key];

      return obj;
    }, {});

  return ordered;
}
