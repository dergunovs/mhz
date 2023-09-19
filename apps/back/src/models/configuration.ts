import { Schema, model } from 'mongoose';

import type { IConfiguration } from 'mhz-contracts';

const configurationSchema = new Schema<IConfiguration>(
  {
    title: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    isShared: { type: Boolean, default: false },
    parts: {
      CPU: { type: Schema.Types.ObjectId, ref: 'Product' },
      Case: { type: Schema.Types.ObjectId, ref: 'Product' },
      Cooler: { type: Schema.Types.ObjectId, ref: 'Product' },
      GPU: { type: Schema.Types.ObjectId, ref: 'Product' },
      Keyboard: { type: Schema.Types.ObjectId, ref: 'Product' },
      Monitor: { type: Schema.Types.ObjectId, ref: 'Product' },
      Motherboard: { type: Schema.Types.ObjectId, ref: 'Product' },
      Mouse: { type: Schema.Types.ObjectId, ref: 'Product' },
      Mousepad: { type: Schema.Types.ObjectId, ref: 'Product' },
      PSU: { type: Schema.Types.ObjectId, ref: 'Product' },
      RAM: { type: Schema.Types.ObjectId, ref: 'Product' },
      SSD: { type: Schema.Types.ObjectId, ref: 'Product' },
    },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Configuration', configurationSchema);
