import { Schema, model } from 'mongoose';

import { IManufacturer } from 'mhz-types';

const manufacturerSchema = new Schema<IManufacturer>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    logoUrl: { type: String, required: true },
    country: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Manufacturer', manufacturerSchema);
