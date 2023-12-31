import { Schema, model } from 'mongoose';

import type { IProduct } from 'mhz-contracts';

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    isInStock: { type: Boolean },
    imageUrls: { type: [String], required: true },
    thumbUrls: { type: [String] },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    manufacturer: { type: Schema.Types.ObjectId, ref: 'Manufacturer' },
    fields: { type: [Object] },
    views: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Product', productSchema);
