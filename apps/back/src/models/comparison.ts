import { Schema, model } from 'mongoose';

import { IComparison } from 'mhz-types';

const comparisonSchema = new Schema<IComparison>({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  customer: { type: Schema.Types.ObjectId, required: true, ref: 'Customer' },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
});

export default model('Comparison', comparisonSchema);
