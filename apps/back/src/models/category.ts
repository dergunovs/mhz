import { Schema, model } from 'mongoose';

import type { ICategory } from 'mhz-contracts';

const categorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, required: true },
    fields: {
      type: [
        {
          title: { type: String, required: true },
          fieldType: { type: String, required: true },
          fieldValue: { type: Schema.Types.Mixed, required: true },
          fieldUnits: { type: String },
        },
      ],
    },
    views: { type: Number },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Category', categorySchema);
