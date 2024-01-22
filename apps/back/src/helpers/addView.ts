import { Document } from 'mongoose';

import type { ICategory, IProduct, IManufacturer } from 'mhz-contracts';

export async function addView(
  entity:
    | (Document<unknown, object, IProduct | ICategory | IManufacturer> & (IProduct | ICategory | IManufacturer))
    | null
) {
  if (!entity) return;

  entity.views = entity.views ? entity.views + 1 : 1;

  await entity.save();
}
