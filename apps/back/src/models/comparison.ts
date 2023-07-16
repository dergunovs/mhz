import { Schema, model } from 'mongoose';

import { IComparison } from 'mhz-types';

const comparisonSchema = new Schema<IComparison>({
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
  user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  date_created: { type: Date, default: Date.now },
});

export default model('Comparison', comparisonSchema);
