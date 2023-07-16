import { Schema, model } from 'mongoose';

import { ICategoryField } from 'mhz-types';

const categoryFieldSchema = new Schema<ICategoryField>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Schema.Types.Mixed, required: true },
  date_created: { type: Date, default: Date.now },
});

export default model('CategoryField', categoryFieldSchema);
