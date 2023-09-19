import type { ICategory, IBaseService } from 'mhz-contracts';

import Category from '../models/category.js';

import { deleteFile } from '../helpers/index.js';

export const categoryService: IBaseService = {
  getMany: async () => {
    const categories: ICategory[] = await Category.find().select('-description -fields').sort('title').lean().exec();

    return categories;
  },

  getOne: async (_id: string) => {
    const category: ICategory | null = await Category.findOne({ _id }).lean().exec();

    return category;
  },

  update: async (_id: string, categoryToUpdate: ICategory) => {
    await Category.findOneAndUpdate({ _id }, { ...categoryToUpdate, dateUpdated: new Date() });
  },

  create: async (categoryToCreate: ICategory) => {
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

  delete: async (_id: string) => {
    const category = await Category.findOne({ _id });

    deleteFile(category?.iconUrl);

    await category?.deleteOne();
  },
};
