import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

import { RefreshToken, User } from '../models';
import { generateTokens } from '../utils';

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();

  if (!users) {
    return res.status(404).send('not found');
  }

  return res.send(users);
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const payload = {
    email,
    password,
  };

  const newUser = await User.create(payload);

  const tokens = generateTokens(payload);

  await RefreshToken.create({
    refreshToken: tokens.refreshToken,
    userID: newUser._id,
  });

  const respData = {
    ...tokens,
    userID: newUser._id,
  };

  return res.status(StatusCodes.CREATED).json(respData);
};

export default {
  getUsers,
  registerUser,
};
