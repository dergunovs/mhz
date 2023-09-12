import { Schema, model } from 'mongoose';

import { ICustomer } from 'mhz-types';

const customerSchema = new Schema<ICustomer>(
  {
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cart: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, count: { type: Number } }],
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    watchedProducts: [{ product: { type: Schema.Types.ObjectId, ref: 'Product' }, dateCreated: { type: Date } }],
    favouriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    comparisons: [{ type: Schema.Types.ObjectId, ref: 'Comparison' }],
    configurations: [{ type: Schema.Types.ObjectId, ref: 'Configuration' }],
    dateLoggedIn: { type: Date },
    dateCreated: { type: Date, default: Date.now },
    dateUpdated: { type: Date },
  },
  { versionKey: false }
);

export default model('Customer', customerSchema);
