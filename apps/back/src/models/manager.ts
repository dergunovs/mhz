import { Schema, model } from 'mongoose';

import type { IManager } from 'mhz-contracts';

const managerSchema = new Schema<IManager>(
  {
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateLoggedIn: { type: Date },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Manager', managerSchema);
