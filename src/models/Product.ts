import { Document, Schema } from 'mongoose';
import db from '../db';

export interface Review {
  reviewer: string;
  rating: number;
  comment?: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  availability: 'in stock' | 'unavailable';
  quantity: number;
  brand: string;
  category?: string;
  image?: string;
  reviews?: Review[];
  isOnSale?: boolean;
  discountPercentage?: number;
  salePrice?: number;
  shippingCost?: number;
  tags?: string[];
}

const productSchema = new Schema<IProduct>({
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
  isOnSale: Boolean,
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  salePrice: Number,
  shippingCost: Number,
  tags: {
    type: Array,
    of: String,
  },
});

export const Product = db.model('Product', productSchema);
