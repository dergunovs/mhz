import bcrypt from 'bcryptjs';
import type { IManager, IQuery } from 'mhz-contracts';

import Manager from '../models/manager.js';

import { paginate } from '../helpers/index.js';

export const managerService = {
  getMany: async (query: IQuery) => {
    const { data, total } = await paginate(Manager, query);

    return { data, total };
  },

  getOne: async (_id: string) => {
    const manager: IManager | null = await Manager.findOne({ _id }).lean().exec();

    return manager;
  },

  update: async (_id: string, managerToUpdate: IManager) => {
    await Manager.findOneAndUpdate({ _id }, { ...managerToUpdate, dateUpdated: new Date() });
  },

  create: async (managerToCreate: IManager) => {
    const manager = new Manager(managerToCreate);

    manager.password = await bcrypt.hash(manager.password, 10);

    await manager.save();
  },

  delete: async (_id: string) => {
    const manager = await Manager.findOne({ _id });

    await manager?.deleteOne();
  },
};
