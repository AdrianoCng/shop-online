import { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import db from '../db';

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', function hashPassword(next) {
  if (!this.isModified(this.password) && !this.isNew) {
    return next();
  }

  return bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;

    return next();
  });
});

export const User = db.model('User', userSchema);
