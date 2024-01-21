import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

import { describe, expect, test, vi } from 'vitest';
import { Document } from 'mongoose';

import type { ICategory, IManufacturer, IProduct } from 'mhz-contracts';

import * as helpers from '.';

const spyUnlink = vi.spyOn(fs, 'unlinkSync').mockReturnValue();

const toFile = vi.fn();
const resize = vi.fn(() => ({ toFile }));

vi.mock('sharp', () => ({ default: vi.fn(() => ({ resize })) }));

describe('helpers', () => {
  describe('decodeToken', () => {
    test('decodes token', async () => {
      const decode = vi.fn().mockImplementation((token: string) => token);
      const token = 'Bearer 123';
      const tokenWithoutBearer = token.split('Bearer ')[1];

      const decodedToken = helpers.decodeToken(decode, token);

      expect(decode).toBeCalledTimes(1);
      expect(decode).toBeCalledWith(tokenWithoutBearer);

      expect(decodedToken).toEqual(tokenWithoutBearer);
    });

    test('returns null without args', async () => {
      const decodedToken = helpers.decodeToken();

      expect(decodedToken).toEqual(null);
    });
  });

  describe('addView', () => {
    test('adds view', async () => {
      const spySave = vi.fn();
      const views = 1;

      const entity = { _id: '1', title: 'text', save: spySave, views } as unknown as
        | (Document<unknown, object, ICategory | IProduct | IManufacturer> & (ICategory | IProduct | IManufacturer))
        | null;

      helpers.addView(entity);

      expect(spySave).toBeCalledTimes(1);
      expect(entity?.views).toEqual(views + 1);
    });
  });

  describe('deleteFile', () => {
    test('deletes file', async () => {
      const filename = 'test.txt';

      helpers.deleteFile(filename);

      expect(spyUnlink).toBeCalledTimes(1);
      expect(spyUnlink).toBeCalledWith(path.resolve(`./public/upload/${filename}`));
    });
  });

  describe('resizeFile', () => {
    test('resizes file', async () => {
      const filename = 'test.txt';
      const width = '500';

      const resizedFilename = await helpers.resizeFile(filename, width);

      expect(sharp).toBeCalledTimes(1);
      expect(sharp).toBeCalledWith(`./public/upload/${filename}`);

      expect(resize).toBeCalledTimes(1);
      expect(resize).toBeCalledWith(Number(width));

      expect(toFile).toBeCalledTimes(1);
      expect(toFile).toBeCalledWith(`./public/upload/resized-${filename}`);

      expect(resizedFilename).toEqual(`resized-${filename}`);
    });
  });
});
