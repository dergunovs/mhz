import { Schema, model } from 'mongoose';

import { IOrder } from 'mhz-types';

const orderSchema = new Schema<IOrder>(
  {
    status: { type: String, required: true, default: 'new' },
    products: [
      {
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        count: { type: Number },
      },
    ],
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
    price: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Order', orderSchema);
