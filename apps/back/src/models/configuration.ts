import { Schema, model } from 'mongoose';

import { IConfiguration } from 'mhz-types';

const configurationSchema = new Schema<IConfiguration>({
  title: { type: String, required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  isShared: { type: Boolean, default: false },
  processor: { type: Schema.Types.ObjectId, ref: 'Product' },
  cooler: { type: Schema.Types.ObjectId, ref: 'Product' },
  mainboard: { type: Schema.Types.ObjectId, ref: 'Product' },
  ram: { type: Schema.Types.ObjectId, ref: 'Product' },
  ssd: { type: Schema.Types.ObjectId, ref: 'Product' },
  videocard: { type: Schema.Types.ObjectId, ref: 'Product' },
  psu: { type: Schema.Types.ObjectId, ref: 'Product' },
  case: { type: Schema.Types.ObjectId, ref: 'Product' },
  monitor: { type: Schema.Types.ObjectId, ref: 'Product' },
  keyboard: { type: Schema.Types.ObjectId, ref: 'Product' },
  mouse: { type: Schema.Types.ObjectId, ref: 'Product' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
});

export default model('Configuration', configurationSchema);
