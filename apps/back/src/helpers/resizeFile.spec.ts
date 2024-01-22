import sharp from 'sharp';

import { describe, expect, test, vi } from 'vitest';

import { resizeFile } from './resizeFile.js';
import * as helpers from './deleteFile.js';

const toFile = vi.fn();
const resize = vi.fn(() => ({ toFile }));

vi.mock('sharp', () => ({ default: vi.fn(() => ({ resize })) }));

const spyDeleteFile = vi.spyOn(helpers, 'deleteFile').mockReturnValue();

describe('resizeFile', () => {
  test('resizes file', async () => {
    const filename = 'test.txt';
    const width = '500';

    const resizedFilename = await resizeFile(filename, width);

    expect(sharp).toBeCalledTimes(1);
    expect(sharp).toBeCalledWith(`./public/upload/${filename}`);

    expect(resize).toBeCalledTimes(1);
    expect(resize).toBeCalledWith(Number(width));

    expect(toFile).toBeCalledTimes(1);
    expect(toFile).toBeCalledWith(`./public/upload/resized-${filename}`);

    expect(spyDeleteFile).toBeCalledTimes(1);
    expect(spyDeleteFile).toBeCalledWith(filename);

    expect(resizedFilename).toEqual(`resized-${filename}`);
  });
});
