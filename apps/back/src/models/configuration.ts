import { Schema, model } from 'mongoose';

import { IConfiguration } from 'mhz-types';

const configurationSchema = new Schema<IConfiguration>({
  title: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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
  date_created: { type: Date, default: Date.now },
});

export default model('Configuration', configurationSchema);
