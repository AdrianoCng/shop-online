import { Schema } from 'mongoose';

import db from '../db';

export interface IRefreshToken {
  refreshToken: string;
  userID: Schema.Types.ObjectId;
  createdAt: Date;
}

const refreshTokenSchema = new Schema<IRefreshToken>({
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    expires: '30d',
    default: Date.now(),
  },
});

export const RefreshToken = db.model('RefreshToken', refreshTokenSchema);
