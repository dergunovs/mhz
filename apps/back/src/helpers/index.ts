import fs from 'fs';
import path from 'path';
import { Model, Schema, Types } from 'mongoose';
import sharp from 'sharp';
import qs from 'qs';

import { IFilterField, IFilterData, IFilterFieldValue } from 'mhz-types';

import { IQuery, IUserToken } from '../interface/index.js';
import Customer from '../models/customer.js';
import Product from '../models/product.js';

function createFilterBase(filter: string | string[], filterName: string) {
  return typeof filter === 'string'
    ? { [filterName]: { $in: [new Types.ObjectId(filter)] } }
    : { [filterName]: { $in: filter.map((id) => new Types.ObjectId(id)) } };
}

function createFilterFields(options: IQuery) {
  const fieldsFiltersRaw = Object.fromEntries(Object.entries(options).filter(([key]) => key.includes('fields[')));

  if (!Object.keys(fieldsFiltersRaw).length) return {};

  const params = new URLSearchParams();

  Object.entries(fieldsFiltersRaw).forEach(([key, value]) => params.append(key, value));

  const fieldsFiltersArray: { [key: string]: string[] }[] = JSON.parse(
    JSON.stringify(qs.parse(params.toString()))
  ).fields;

  if (!fieldsFiltersArray?.length) return {};

  return {
    $and: fieldsFiltersArray.map((filter) => {
      return {
        fields: {
          $elemMatch: {
            title: Object.keys(filter)[0],
            fieldValue: {
              $in: Object.values(filter)[0].map((val) => {
                if (['true', 'false'].includes(val)) return JSON.parse(val);

                return val;
              }),
            },
          },
        },
      };
    }),
  };
}

export async function paginate<T>(Entity: Model<T>, options: IQuery) {
  const categoryFilter = options.category ? createFilterBase(options.category, 'category') : {};
  const manufacturerFilter = options.manufacturer ? createFilterBase(options.manufacturer, 'manufacturer') : {};
  const fieldsFilters = createFilterFields(options);

  const priceFilter = options.price
    ? { price: { $gte: Number(options.price[0]), $lte: Number(options.price[1]) } }
    : {};

  const filter = { ...categoryFilter, ...manufacturerFilter, ...priceFilter, ...fieldsFilters };

  const page = Number(options.page) || 1;
  const sort = options.sort === undefined ? '-dateCreated' : `${options.dir === 'desc' ? '-' : ''}${options.sort}`;

  const limit = 12;

  const count = await Entity.find(filter).countDocuments().exec();

  const total = Math.ceil(count / limit);

  const data = await Entity.find()
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate(options.populate || [])
    .select(options.select || '-password -__v')
    .sort(sort)
    .lean()
    .exec();

  return {
    data,
    total,
  };
}

export async function getProductFilters(options: IQuery, isInitial: boolean): Promise<IFilterData> {
  const categoryFilter = options.category ? createFilterBase(options.category, 'category') : {};
  const manufacturerFilter = options.manufacturer ? createFilterBase(options.manufacturer, 'manufacturer') : {};
  const fieldsFilters = createFilterFields(options);

  const priceFilter = options.price
    ? { price: { $gte: Number(options.price[0]), $lte: Number(options.price[1]) } }
    : {};

  const filterInitial = options.initiator === 'category' ? categoryFilter : manufacturerFilter;
  const filterBase = { ...categoryFilter, ...manufacturerFilter, ...priceFilter, ...fieldsFilters };

  const filter = isInitial ? filterInitial : filterBase;

  const filterByManufacturer = await Product.aggregate([
    { $match: filter },
    { $group: { _id: '$manufacturer', count: { $sum: 1 } } },
    { $lookup: { from: 'manufacturers', localField: '_id', foreignField: '_id', as: 'manufacturer' } },
    { $unwind: '$manufacturer' },
    { $project: { _id: 0 } },
    { $project: { _id: '$manufacturer._id', title: '$manufacturer.title', count: 1 } },
  ]);

  const filterByCategory = await Product.aggregate([
    { $match: filter },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $lookup: { from: 'categories', localField: '_id', foreignField: '_id', as: 'category' } },
    { $unwind: '$category' },
    { $project: { _id: 0 } },
    { $project: { _id: '$category._id', title: '$category.title', count: 1 } },
  ]);

  const filterByFields = await Product.aggregate([
    { $match: filter },
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

  const titles = [...new Set(filterByFields.map((item) => item.title))];

  const groupedFields: IFilterField = {};

  titles.forEach((title) => {
    groupedFields[title] = {
      fieldUnits: '',
      fieldValues: [],
    };

    filterByFields.forEach((item) => {
      if (item.title === title) {
        groupedFields[title].fieldUnits = item.fieldUnits;
        groupedFields[title].fieldValues.push({ value: item.fieldValue, count: item.count });

        groupedFields[title].fieldValues.sort((a, b) =>
          item.fieldType === 'number'
            ? Number(a.value) - Number(b.value)
            : a.value.toString().localeCompare(b.value.toString())
        );
      }
    });
  });

  const orderedFields = Object.keys(groupedFields)
    .sort()
    .reduce((obj: { [key: string]: { fieldUnits?: string; fieldValues: IFilterFieldValue[] } }, key) => {
      obj[key] = groupedFields[key];

      return obj;
    }, {});

  return {
    category: filterByCategory.sort((a, b) => a.title.localeCompare(b.title)),
    manufacturer: filterByManufacturer.sort((a, b) => a.title.localeCompare(b.title)),
    fields: orderedFields,
  };
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

export function decodeToken(decode: (token: string) => IUserToken | null, authorizationHeader?: string) {
  const token = authorizationHeader ? authorizationHeader.split('Bearer ')[1] : undefined;

  return token ? decode(token) : null;
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
