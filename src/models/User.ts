import { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

import db from '../db';

export interface IUser extends Document {
  email: string;
  password: string;
}

export interface IUserMethods {
  isValidPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser, Model<IUser>, IUserMethods>({
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

userSchema.method('isValidPassword', async function isValidPassword(password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    return false;
  }
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
