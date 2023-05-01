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
  rating: number;
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
  rating: Number,
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
    of: {
      type: String,
      lowercase: true,
    },
  },
});

// TODO: pre save not working properly - inOnSale and salePrice should be update on product updates
productSchema.pre('save', function isOnSale(next) {
  if (!!this.discountPercentage && this.discountPercentage > 0) {
    const discountAmount = (this.price * this.discountPercentage) / 100;

    this.isOnSale = true;
    this.salePrice = parseFloat((this.price - discountAmount).toFixed(2));
  }

  next();
});

productSchema.pre('save', function getRating(next) {
  const { reviews } = this;

  if (reviews && reviews.length > 0) {
    const ratingSum = reviews.reduce((acc, { rating }) => acc + rating, 0);
    const average = ratingSum / reviews.length;

    this.rating = average;
  }

  next();
});

export const Product = db.model('Product', productSchema);
