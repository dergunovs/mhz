import { Schema, model } from 'mongoose';

import { ICategoryField } from 'mhz-types';

const categoryFieldSchema = new Schema<ICategoryField>({
  title: { type: String, required: true },
  fieldType: { type: String, required: true },
  fieldValue: { type: Schema.Types.Mixed, required: true },
  fieldUnits: { type: String },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date },
});

export default model('CategoryField', categoryFieldSchema);
