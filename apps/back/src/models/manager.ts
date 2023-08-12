import { Schema, model } from 'mongoose';

import { IManager } from 'mhz-types';

const managerSchema = new Schema<IManager>({
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateLoggedIn: { type: Date },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
});

export default model('Manager', managerSchema);
