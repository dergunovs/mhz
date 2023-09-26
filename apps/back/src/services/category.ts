import type { ICategory, ICategoryService } from 'mhz-contracts';

import Category from '../models/category.js';

import { deleteFile, addView } from '../helpers/index.js';

export const categoryService: ICategoryService = {
  getMany: async <T>() => {
    const categories: ICategory[] = await Category.find().select('-description -fields').sort('title').lean().exec();

    return { data: categories as T[] };
  },

  getPopular: async <T>() => {
    const categories: ICategory[] = await Category.find()
      .select('-description -fields')
      .sort('-views')
      .limit(6)
      .lean()
      .exec();

    return categories as T[];
  },

  getOne: async <T>(_id: string) => {
    const category = await Category.findOne({ _id }).exec();

    addView(category);

    return { data: category as T };
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Category.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(categoryToCreate: T) => {
    const limit = 12;

    const count = await Category.find().countDocuments().exec();

    if (count === limit) {
      return true;
    } else {
      const category = new Category(categoryToCreate);

      await category.save();

      return false;
    }
  },

  delete: async (_id?: string) => {
    const category = await Category.findOne({ _id });

    deleteFile(category?.iconUrl);

    await category?.deleteOne();
  },
};
