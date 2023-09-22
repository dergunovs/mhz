import type { IBaseService, IQuery } from 'mhz-contracts';

import Manufacturer from '../models/manufacturer.js';

import { paginate, deleteFile, addView } from '../helpers/index.js';

export const manufacturerService: IBaseService = {
  getMany: async <T>(query?: IQuery) => {
    const { data, total } = await paginate(Manufacturer, { ...query, select: '-description' });

    return { data: data as T[], total };
  },

  getOne: async <T>(_id: string) => {
    const manufacturer = await Manufacturer.findOne({ _id }).exec();

    addView(manufacturer);

    return { data: manufacturer as T };
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Manufacturer.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(manufacturerToCreate: T) => {
    const manufacturer = new Manufacturer(manufacturerToCreate);

    await manufacturer.save();
  },

  delete: async (_id?: string) => {
    const manufacturer = await Manufacturer.findOne({ _id });

    deleteFile(manufacturer?.logoUrl);

    await manufacturer?.deleteOne();
  },
};
