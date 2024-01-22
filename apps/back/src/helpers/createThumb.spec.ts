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

    expect(sharp).toBeCalledTimes(1);
    expect(sharp).toBeCalledWith(`./public/upload/${filename}`);

    expect(resize).toBeCalledTimes(1);
    expect(resize).toBeCalledWith(480);

    expect(webp).toBeCalledTimes(1);
    expect(webp).toBeCalledWith({ quality: 64 });

    expect(toFile).toBeCalledTimes(1);
    expect(toFile).toBeCalledWith(`./public/upload/thumb-${filename}.webp`);

    expect(resizedFilename).toEqual(`thumb-${filename}.webp`);
  });
});
