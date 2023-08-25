import fs from 'fs';
import { Model, PopulateOptions } from 'mongoose';
import path from 'path';
import sharp from 'sharp';

export function deleteFile(filename?: string) {
  try {
    fs.unlinkSync(path.resolve(`./public/upload/${filename}`));
  } catch (err) {
    throw err;
  }
}

export async function resizeFile(filename: string, width: string) {
  try {
    await sharp(`./public/upload/${filename}`).resize(Number(width)).toFile(`./public/upload/resized-${filename}`);

    deleteFile(filename);

    return `resized-${filename}`;
  } catch (err) {
    throw err;
  }
}

export async function paginate<T>(
  Entity: Model<T>,
  options?: { page?: string; sort?: string; dir?: string; populate?: PopulateOptions[] }
) {
  try {
    const page = Number(options?.page) || 1;
    const sort = options?.sort === undefined ? '-dateCreated' : `${options?.dir === 'desc' ? '-' : ''}${options?.sort}`;

    const limit = 12;

    const count = await Entity.estimatedDocumentCount();
    const total = Math.ceil(count / limit);

    const data = await Entity.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(options?.populate || [])
      .select('-password -__v')
      .sort(sort)
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
