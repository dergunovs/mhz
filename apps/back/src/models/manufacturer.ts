import { Schema, model } from 'mongoose';

import { IManufacturer } from 'mhz-types';

const manufacturerSchema = new Schema<IManufacturer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  logoUrl: { type: String, required: true },
  country: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date },
});

export default model('Manufacturer', manufacturerSchema);
