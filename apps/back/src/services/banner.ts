import type { IQuery, IBanner } from 'mhz-contracts';

import Banner from '../models/banner.js';

import { IBannerService } from '../interface/index.js';

import { paginate, deleteFile } from '../helpers/index.js';

export const bannerService: IBannerService = {
  getMany: async <T>(query?: IQuery) => {
    const { data, total } = await paginate(Banner, {
      ...query,
      populate: [
        { path: 'product', select: 'title price thumbUrls category', populate: { path: 'category', select: 'title' } },
      ],
    });

    return { data: data as T[], total };
  },

  getActive: async <T>() => {
    const banners: IBanner[] = await Banner.find({ isActive: true })
      .populate([
        { path: 'product', select: 'title price thumbUrls category', populate: { path: 'category', select: 'title' } },
      ])
      .sort('-dateCreated')
      .limit(4)
      .lean()
      .exec();

    return banners as T[];
  },

  getOne: async <T>(_id: string) => {
    const banner = await Banner.findOne({ _id })
      .populate([
        { path: 'product', select: 'title price thumbUrls category', populate: { path: 'category', select: 'title' } },
      ])
      .exec();

    return { data: banner as T };
  },

  update: async <T>(itemToUpdate: T, _id?: string) => {
    await Banner.findOneAndUpdate({ _id }, { ...itemToUpdate, dateUpdated: new Date() });
  },

  create: async <T>(bannerToCreate: T) => {
    const banner = new Banner(bannerToCreate);

    await banner.save();
  },

  delete: async (_id?: string) => {
    const banner = await Banner.findOne({ _id });

    deleteFile(banner?.imageUrl);

    await banner?.deleteOne();
  },
};
