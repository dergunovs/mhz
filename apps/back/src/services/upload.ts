import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';
import type { IFileToUpload, IUploadService } from 'mhz-contracts';

import { createThumb, deleteFile, resizeFile } from '../helpers/index.js';

const pump = util.promisify(pipeline);

export const uploadService: IUploadService = {
  uploadMultiple: async (files: AsyncIterableIterator<IFileToUpload>, width: string, isThumb: boolean) => {
    const filesToUpload: string[] = [];

    for await (const file of files) {
      let filename = `${Date.now()}-${file.filename}`;

      await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

      if (width) filename = await resizeFile(filename, width);
      if (isThumb) await createThumb(filename);

      filesToUpload.push(filename);
    }

    return filesToUpload;
  },

  uploadSingle: async (file: IFileToUpload | undefined, width: string, isThumb: boolean) => {
    const isFileExists = !!file;

    if (!isFileExists) {
      return {
        filename: '',
        isFileExists: false,
      };
    }

    let filename = `${Date.now()}-${file.filename}`;

    await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

    if (width) filename = await resizeFile(filename, width);
    if (isThumb) await createThumb(filename);

    return { filename, isFileExists: true };
  },

  delete: async (_id: string, thumb: string) => {
    deleteFile(_id);

    if (thumb === 'true') deleteFile(`thumb-${_id}.webp`);
  },
};
