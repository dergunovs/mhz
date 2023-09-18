import { isValidObjectId } from 'mongoose';
import { ICategory } from 'mhz-types';

import Category from '../models/category.js';

import { deleteFile } from '../helpers/index.js';

export const categoryService = {
  getMany: async () => {
    const categories: ICategory[] = await Category.find().select('-description -fields').sort('title').lean().exec();

    return categories;
  },

  getOne: async (_id: string) => {
    const isNotValidId = !isValidObjectId(_id);

    if (isNotValidId) {
      return { category: null, isCategoryFound: false, isNotValidId };
    } else {
      const category: ICategory | null = await Category.findOne({ _id }).lean().exec();

      const isCategoryFound = !!category;

      return { category, isCategoryFound, isNotValidId };
    }
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
