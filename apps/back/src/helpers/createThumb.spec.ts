import sharp from 'sharp';

import { describe, expect, test, vi } from 'vitest';

import { createThumb } from './createThumb.js';

const toFile = vi.fn();
const webp = vi.fn(() => ({ toFile }));
const resize = vi.fn(() => ({ webp }));

vi.mock('sharp', () => ({ default: vi.fn(() => ({ resize })) }));

describe('createThumb', () => {
  test('resizes file', async () => {
    const filename = 'test.txt';

    const resizedFilename = await createThumb(filename);

    expect(sharp).toHaveBeenCalledTimes(1);
    expect(sharp).toHaveBeenCalledWith(`./public/upload/${filename}`);

    expect(resize).toHaveBeenCalledTimes(1);
    expect(resize).toHaveBeenCalledWith(480);

    expect(webp).toHaveBeenCalledTimes(1);
    expect(webp).toHaveBeenCalledWith({ quality: 64 });

    expect(toFile).toHaveBeenCalledTimes(1);
    expect(toFile).toHaveBeenCalledWith(`./public/upload/thumb-${filename}.webp`);

    expect(resizedFilename).toEqual(`thumb-${filename}.webp`);
  });
});
