import { Schema, model } from 'mongoose';

import type { IBanner } from 'mhz-contracts';

const adSchema = new Schema<IBanner>(
  {
    isActive: { type: Boolean, required: true },
    text: { type: String, required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    imageUrl: { type: String, required: true },
    color: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Banner', adSchema);
