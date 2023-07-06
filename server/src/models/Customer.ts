import { Document, Schema } from 'mongoose';

import db from 'db';

export interface ICustomer extends Document {
  userID: Schema.Types.ObjectId;
  shippingAddress: string;
  paymentMethod: string;
  // orderHistory: Order[];
}

const customerSchema = new Schema<ICustomer>({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  shippingAddress: String,
  paymentMethod: String,
  //   orderHistory: [
  //     {
  //         type: Schema.Types.ObjectId,
  //         ref: 'Order'
  //     }
  //   ]
});

export const Customer = db.model('Customer', customerSchema);
