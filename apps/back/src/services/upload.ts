import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
import type { IFileToUpload } from 'mhz-contracts';

import { createThumb, deleteFile, resizeFile } from '../helpers/index.js';
import { IUploadService } from '../interface/index.js';

const pump = promisify(pipeline);

export const uploadService: IUploadService = {
  uploadMultiple: async (files: AsyncIterableIterator<IFileToUpload>, width?: string, thumb?: string) => {
    const filesToUpload: string[] = [];

    for await (const file of files) {
      let filename = `${Date.now()}-${file.filename}`;

      await pump(file.file, fs.createWriteStream(path.resolve(`./public/upload/${filename}`)));

      if (width) filename = await resizeFile(filename, width);
      if (thumb === 'true') await createThumb(filename);

      filesToUpload.push(filename);
    }

    return filesToUpload;
  },

  uploadSingle: async (file: IFileToUpload | undefined, width?: string, thumb?: string) => {
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
    if (thumb === 'true') await createThumb(filename);

    return { filename, isFileExists: true };
  },

  delete: async (_id: string, thumb?: string) => {
    deleteFile(_id);

    if (thumb === 'true') deleteFile(`thumb-${_id}.webp`);
  },
};
