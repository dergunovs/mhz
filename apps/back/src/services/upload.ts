import fs from 'fs';
import path from 'path';
import util from 'util';
import { pipeline } from 'stream';
import { MultipartFile } from '@fastify/multipart';
import type { IUploadService } from 'mhz-contracts';

import { createThumb, deleteFile, resizeFile } from '../helpers/index.js';

const pump = util.promisify(pipeline);

export const uploadService: IUploadService = {
  uploadMultiple: async (getFiles: () => AsyncIterableIterator<MultipartFile>, width: string, isThumb: boolean) => {
    const files = getFiles();

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

  uploadSingle: async (getFile: () => Promise<MultipartFile | undefined>, width: string, isThumb: boolean) => {
    const file = await getFile();

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

  delete: async (_id: string, isThumb: boolean) => {
    deleteFile(_id);

    if (isThumb) deleteFile(`thumb-${_id}.webp`);
  },
};
