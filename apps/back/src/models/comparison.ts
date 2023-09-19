import { Schema, model } from 'mongoose';

import type { IComparison } from 'mhz-contracts';

const comparisonSchema = new Schema<IComparison>(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Comparison', comparisonSchema);
