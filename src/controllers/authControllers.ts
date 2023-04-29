import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { RefreshToken, User } from '@models/index';
import { generateTokens } from '@utils/index';
import { AuthError, ConflictError } from '@errors/index';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return next(new ConflictError('User already exists'));
  }

  const newUser = await User.create({ email, password });

  const userID = newUser._id;

  const payload = {
    email,
    password,
    userID,
  };

  const tokens = generateTokens(payload);

  await RefreshToken.create({
    refreshToken: tokens.refreshToken,
    userID,
  });

  const respData = {
    ...tokens,
    userID,
  };

  return res.status(StatusCodes.CREATED).json(respData);
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const invalidCredentialsError = new AuthError('Invalid email or password');

  if (!user) {
    return next(invalidCredentialsError);
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    return next(invalidCredentialsError);
  }

  const userID = user._id;

  const payload = {
    email,
    password,
    userID,
  };

  const tokens = generateTokens(payload);

  await RefreshToken.create({
    refreshToken: tokens.refreshToken,
    userID,
  });

  return res.status(200).json({
    ...tokens,
    userID,
  });
};

export default {
  registerUser,
  loginUser,
};
