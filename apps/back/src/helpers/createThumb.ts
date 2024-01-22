import sharp from 'sharp';

export async function createThumb(filename: string) {
  await sharp(`./public/upload/${filename}`)
    .resize(480)
    .webp({ quality: 64 })
    .toFile(`./public/upload/thumb-${filename}.webp`);

  return `thumb-${filename}.webp`;
}
