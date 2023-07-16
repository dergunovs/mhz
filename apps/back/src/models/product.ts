import { Schema, model } from 'mongoose';

import { IProduct } from 'mhz-types';

const productSchema = new Schema<IProduct>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isInStock: { type: Boolean, required: true },
  imageURLs: { type: [String], required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
  fields: { type: [Schema.Types.ObjectId], ref: 'CategoryField' },
  date_created: { type: Date, default: Date.now },
});

export default model('Product', productSchema);
