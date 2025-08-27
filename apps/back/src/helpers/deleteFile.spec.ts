import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, test, vi } from 'vitest';

import { deleteFile } from './deleteFile.js';

const spyUnlink = vi.spyOn(fs, 'unlinkSync').mockReturnValue();

const toFile = vi.fn();
const resize = vi.fn(() => ({ toFile }));

vi.mock('sharp', () => ({ default: vi.fn(() => ({ resize })) }));

describe('deleteFile', () => {
  test('deletes file', async () => {
    const filename = 'test.txt';

    deleteFile(filename);

    expect(spyUnlink).toBeCalledTimes(1);
    expect(spyUnlink).toBeCalledWith(path.resolve(`./public/upload/${filename}`));
  });
});
