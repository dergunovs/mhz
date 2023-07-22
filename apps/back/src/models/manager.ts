import { Schema, model } from 'mongoose';

import { IManager } from 'mhz-types';

const managerSchema = new Schema<IManager>({
  first_name: { type: String },
  last_name: { type: String },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  date_created: { type: Date, default: Date.now },
  date_logged_in: { type: Date },
  date_updated: { type: Date },
});

export default model('Manager', managerSchema);
