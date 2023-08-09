import fs from 'fs';
import { Model } from 'mongoose';
import path from 'path';

export function deleteFile(filename?: string) {
  try {
    fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
  } catch (err) {
    throw err;
  }
}

export async function paginate<T>(Entity: Model<T>, pageQuery?: string) {
  try {
    const page = Number(pageQuery) || 1;
    const limit = 20;

    const count = await Entity.estimatedDocumentCount();
    const total = Math.round(count / limit) === 0 ? 1 : Math.round(count / limit);

    const data = await Entity.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort('-date_created')
      .lean()
      .exec();

    return {
      data,
      total,
    };
  } catch (err) {
    throw err;
  }
}
