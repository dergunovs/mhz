import { Schema, model } from 'mongoose';

import { IOrder } from 'mhz-types';

const orderSchema = new Schema<IOrder>({
  status: { type: String, required: true, default: 'payment' },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: 'Product' },
      count: { type: { Number } },
    },
  ],
  shipment: { type: Schema.Types.ObjectId, required: true, ref: 'Shipment' },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date },
});

export default model('Order', orderSchema);
