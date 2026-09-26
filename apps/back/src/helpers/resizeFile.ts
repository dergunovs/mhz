import sharpLib from 'sharp';

import { deleteFile } from './deleteFile.js';

export async function resizeFile(filename: string, width: string) {
  await sharpLib(`./public/upload/${filename}`).resize(Number(width)).toFile(`./public/upload/resized-${filename}`);

  deleteFile(filename);

  return `resized-${filename}`;
}
