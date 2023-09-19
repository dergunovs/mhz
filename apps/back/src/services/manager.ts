import bcrypt from 'bcryptjs';
import type { IManager, IBaseService, IQuery } from 'mhz-contracts';

import Manager from '../models/manager.js';

import { paginate } from '../helpers/index.js';

export const managerService: IBaseService = {
  getMany: async <T>(query?: IQuery) => {
    const { data, total } = await paginate(Manager, query);

    return { data: data as T[], total };
  },

  getOne: async <T>(_id: string) => {
    const manager: IManager | null = await Manager.findOne({ _id }).lean().exec();

    return { data: manager as T };
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Manager.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(managerToCreate: T) => {
    const manager = new Manager(managerToCreate);

    manager.password = await bcrypt.hash(manager.password, 10);

    await manager.save();
  },

  delete: async (_id?: string) => {
    const manager = await Manager.findOne({ _id });

    await manager?.deleteOne();
  },
};
