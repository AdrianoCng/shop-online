import { Document, Schema } from 'mongoose';
import db from '../db';

export interface Review {
  reviewer: string;
  rating: number;
  comment?: string;
}

export interface IProduct {
  name: string;
  description: string;
  price: number;
  availability: 'in stock' | 'unavailable';
  quantity: number;
  brand: string;
  category: string;
  image?: string;
  reviews?: Review[];
  isOnSale?: boolean;
  discountPercentage?: number;
  salePrice?: number;
  shippingCost?: number;
  tags?: string[];
}

export type IProductDocument = IProduct & Document;

const productSchema = new Schema<IProductDocument>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: String,
    enum: ['in stock', 'unavailable'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: String,
  image: String,
  reviews: [
    {
      reviewer: {
        type: String,
        required: true,
      },
      comment: String,
      rating: {
        type: Number,
        required: true,
      },
    },
  ],
  isOnSale: {
    type: Boolean,
    immutable: true,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  salePrice: {
    type: Number,
    immutable: true,
  },
  shippingCost: Number,
  tags: {
    type: Array,
    of: String,
  },
});

productSchema.pre('save', function (next) {
  if (!!this.discountPercentage && this.discountPercentage > 0) {
    const discountAmount = (this.price * this.discountPercentage) / 100;

    this.isOnSale = true;
    this.salePrice = parseFloat((this.price - discountAmount).toFixed(2));
  }

  next();
});

export const Product = db.model('Product', productSchema);
