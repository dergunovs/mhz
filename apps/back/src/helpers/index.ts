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

export async function paginate<T>(Entity: Model<T>, pageQuery?: string, populate?: PopulateOptions[]) {
  try {
    const page = Number(pageQuery) || 1;
    const limit = 12;

    const count = await Entity.estimatedDocumentCount();
    const total = Math.ceil(count / limit);

    const data = await Entity.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate(populate || [])
      .select('-password -__v')
      .sort('-dateCreated')
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
