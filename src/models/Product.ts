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
  discountPercentage?: number;
  shippingCost?: number;
  tags?: string[];
}

export type IProductDocument = IProduct & Document;

const productSchema = new Schema<IProductDocument>({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
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
    lowercase: true,
  },
  category: {
    type: String,
    lowercase: true,
  },
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
        min: 1,
        max: 5,
      },
    },
  ],
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  shippingCost: Number,
  tags: {
    type: Array,
    of: {
      type: String,
      lowercase: true,
    },
  },
});

productSchema.virtual('isOnSale').get(function getIsOnSale() {
  return !!this.discountPercentage;
});

productSchema.virtual('salePrice').get(function getSalePrice() {
  if (!this.discountPercentage) return this.price;

  const discountAmount = (this.price * this.discountPercentage) / 100;

  return parseFloat((this.price - discountAmount).toFixed(2));
});

productSchema.virtual('ratingAverage').get(function getRating() {
  if (!this.reviews || this.reviews.length === 0) {
    return null;
  }

  const ratingSum = this.reviews.reduce((acc, { rating }) => acc + rating, 0);
  const average = ratingSum / this.reviews.length;

  return average;
});

productSchema.set('toJSON', { virtuals: true });

export const Product = db.model('Product', productSchema);
