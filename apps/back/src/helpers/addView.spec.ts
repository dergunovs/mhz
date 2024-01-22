import { describe, expect, test, vi } from 'vitest';
import { Document } from 'mongoose';

import type { ICategory, IManufacturer, IProduct } from 'mhz-contracts';

import { addView } from './addView.js';

describe('addView', () => {
  test('adds view', async () => {
    const spySave = vi.fn();
    const views = 1;

    const entity = { _id: '1', title: 'text', save: spySave, views } as unknown as
      | (Document<unknown, object, ICategory | IProduct | IManufacturer> & (ICategory | IProduct | IManufacturer))
      | null;

    addView(entity);

    expect(spySave).toBeCalledTimes(1);
    expect(entity?.views).toEqual(views + 1);
  });
});
