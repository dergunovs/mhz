import { Schema, model } from 'mongoose';

import { ICart } from 'mhz-types';

const cartSchema = new Schema<ICart>({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      count: { type: { Number } },
    },
  ],
  isShared: { type: Boolean, required: true },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date },
});

export default model('Cart', cartSchema);
