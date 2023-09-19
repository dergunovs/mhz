import type { IConfiguration, IQuery, IUserToken } from 'mhz-contracts';

import Configuration from '../models/configuration.js';

import { decodeToken, paginate } from '../helpers/index.js';

export const configurationService = {
  getMany: async (query: IQuery, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const filter = user?.role === 'customer' ? { customer: user._id } : {};

    const { data, total } = await paginate(Configuration, {
      ...query,
      ...filter,
      populate: [{ path: 'customer', select: 'firstName lastName' }],
      select: '-parts',
    });

    return { data, total };
  },

  getOne: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const configuration: IConfiguration | null = await Configuration.findOne({ _id })
      .populate([
        { path: 'customer', select: 'firstName lastName' },
        {
          path: 'parts.CPU',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Case',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Cooler',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.GPU',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Keyboard',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Monitor',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Motherboard',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Mouse',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.Mousepad',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.PSU',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.RAM',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
        {
          path: 'parts.SSD',
          select: 'title price fields category',
          populate: { path: 'category', select: 'title' },
        },
      ])
      .lean()
      .exec();

    const isEditable = configuration?.customer?._id?.toString() === user?._id;
    const isSharable = isEditable || !!configuration?.isShared;

    return { configuration, isEditable, isSharable };
  },

  update: async (_id: string, configurationToUpdate: IConfiguration) => {
    await Configuration.findOneAndUpdate({ _id }, { ...configurationToUpdate, dateUpdated: new Date() });
  },

  create: async (configurationToCreate: IConfiguration) => {
    const configuration = new Configuration(configurationToCreate);

    await configuration.save();
  },

  delete: async (_id: string, decode: (token: string) => IUserToken | null, token?: string) => {
    const user = decodeToken(decode, token);

    const configuration = await Configuration.findOne({ _id });

    const isDeletable = user?.role === 'manager' || configuration?.customer?._id?.toString() === user?._id;

    if (isDeletable) await configuration?.deleteOne();

    return isDeletable;
  },
};
