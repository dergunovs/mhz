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
  date_created: { type: Date, default: Date.now },
});

export default model('Shipment', shipmentSchema);
