import type { ICategory, IBaseService } from 'mhz-contracts';

import Category from '../models/category.js';

import { deleteFile } from '../helpers/index.js';

export const categoryService: IBaseService = {
  getMany: async <T>() => {
    const categories: ICategory[] = await Category.find().select('-description -fields').sort('title').lean().exec();

    return { data: categories as T[] };
  },

  getOne: async <T>(_id: string) => {
    const category: ICategory | null = await Category.findOne({ _id }).lean().exec();

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
