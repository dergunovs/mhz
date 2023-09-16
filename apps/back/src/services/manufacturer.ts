import { IManufacturer } from 'mhz-types';

import Manufacturer from '../models/manufacturer.js';

import { paginate, deleteFile } from '../helpers/index.js';
import { IQuery } from '../interface/index.js';

export const manufacturerService = {
  getMany: async (query: IQuery) => {
    const { data, total } = await paginate(Manufacturer, { ...query, select: '-description' });

    return { data, total };
  },

  getOne: async (_id: string) => {
    const manufacturer: IManufacturer | null = await Manufacturer.findOne({ _id }).lean().exec();

    return manufacturer;
  },

  update: async (_id: string, manufacturerToUpdate: IManufacturer) => {
    await Manufacturer.findOneAndUpdate({ _id }, { ...manufacturerToUpdate, dateUpdated: new Date() });
  },

  create: async (manufacturerToCreate: IManufacturer) => {
    const manufacturer = new Manufacturer(manufacturerToCreate);

    await manufacturer.save();
  },

  delete: async (_id: string) => {
    const manufacturer = await Manufacturer.findOne({ _id });

    deleteFile(manufacturer?.logoUrl);

    await manufacturer?.deleteOne();
  },
};
