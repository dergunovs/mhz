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

    expect(sharp).toHaveBeenCalledTimes(1);
    expect(sharp).toHaveBeenCalledWith(`./public/upload/${filename}`);

    expect(resize).toHaveBeenCalledTimes(1);
    expect(resize).toHaveBeenCalledWith(Number(width));

    expect(toFile).toHaveBeenCalledTimes(1);
    expect(toFile).toHaveBeenCalledWith(`./public/upload/resized-${filename}`);

    expect(spyDeleteFile).toHaveBeenCalledTimes(1);
    expect(spyDeleteFile).toHaveBeenCalledWith(filename);

    expect(resizedFilename).toEqual(`resized-${filename}`);
  });
});
