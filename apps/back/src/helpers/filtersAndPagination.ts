import qs from 'qs';
import { Model, Types } from 'mongoose';

import type { IFilterField, IFilterData, IQuery, IQueryPopulated } from 'mhz-contracts';

import Product from '../models/product.js';

function createFilterBase(filter: string | string[], filterName: string) {
  return typeof filter === 'string'
    ? { [filterName]: { $in: [new Types.ObjectId(filter)] } }
    : { [filterName]: { $in: filter.map((id) => new Types.ObjectId(id)) } };
}

function createFilterFields(options?: IQuery) {
  if (!options) return;

  const fieldsFiltersRaw = Object.fromEntries(Object.entries(options).filter(([key]) => key.includes('fields[')));

  if (Object.keys(fieldsFiltersRaw).length === 0) return {};

  const params = new URLSearchParams();

  Object.entries(fieldsFiltersRaw).forEach(([key, value]) => params.append(key, value));

  const fieldsFiltersArray = structuredClone(qs.parse(params.toString())).fields as { [key: string]: string[] }[];

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

export async function paginate<T>(Entity: Model<T>, options?: IQueryPopulated) {
  const categoryFilter = options?.category ? createFilterBase(options?.category, 'category') : {};
  const manufacturerFilter = options?.manufacturer ? createFilterBase(options?.manufacturer, 'manufacturer') : {};
  const fieldsFilters = createFilterFields(options);

  const priceFilter = options?.price
    ? { price: { $gte: Number(options.price[0]), $lte: Number(options.price[1]) } }
    : {};

  const customerFilter = options?.customer ? { customer: options.customer } : {};

  const filter = {
    ...categoryFilter,
    ...manufacturerFilter,
    ...priceFilter,
    ...fieldsFilters,
    ...customerFilter,
  };

  const page = Number(options?.page) || 1;
  const sortDir = options?.dir === 'desc' ? '-' : '';
  const sort = options?.sort === undefined ? '-dateCreated' : `${sortDir}${options.sort}`;

  const limit = 12;

  const count = await Entity.find(filter).countDocuments().exec();

  const total = Math.ceil(count / limit);

  const data = (await Entity.find()
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate(options?.populate || [])
    .select(options?.select || '-password')
    .sort(sort)
    .lean()
    .exec()) as T[];

  return {
    data,
    total,
  };
}

export async function getProductFilters(options?: IQuery, isInitial?: boolean): Promise<IFilterData | undefined> {
  if (!options) return;

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
        (groupedFields[title] as IFilterField).fieldUnits = item.fieldUnits;
        groupedFields[title]?.fieldValues?.push({ value: item.fieldValue, count: item.count });

        groupedFields[title]?.fieldValues?.sort((a, b) =>
          item.fieldType === 'number'
            ? Number(a.value) - Number(b.value)
            : a.value.toString().localeCompare(b.value.toString())
        );
      }
    });
  });

  const orderedFields = Object.keys(groupedFields)
    .sort((a, b) => a.localeCompare(b))
    .reduce((obj: IFilterField, key) => {
      obj[key] = groupedFields[key];

      return obj;
    }, {});

  return {
    category: filterByCategory.sort((a, b) => a.title.localeCompare(b.title)),
    manufacturer: filterByManufacturer.sort((a, b) => a.title.localeCompare(b.title)),
    fields: orderedFields,
  };
}
