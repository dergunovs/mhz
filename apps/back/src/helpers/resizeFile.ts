import sharp from 'sharp';

import { deleteFile } from './deleteFile.js';

export async function resizeFile(filename: string, width: string) {
  await sharp(`./public/upload/${filename}`).resize(Number(width)).toFile(`./public/upload/resized-${filename}`);

  deleteFile(filename);

  return `resized-${filename}`;
}
