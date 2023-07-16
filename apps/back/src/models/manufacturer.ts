import { Schema, model } from 'mongoose';

import { IManufacturer } from 'mhz-types';

const manufacturerSchema = new Schema<IManufacturer>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  logoURL: { type: String, required: true },
  date_created: { type: Date, default: Date.now },
});

export default model('Manufacturer', manufacturerSchema);
