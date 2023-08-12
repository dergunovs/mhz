import { Schema, model } from 'mongoose';

import { IShipment } from 'mhz-types';

const shipmentSchema = new Schema<IShipment>({
  adress: {
    region: { type: String },
    city: { type: String },
    street: { type: String },
    house: { type: String },
    room: { type: String },
  },
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now },
  dateUpdated: { type: Date },
});

export default model('Shipment', shipmentSchema);
