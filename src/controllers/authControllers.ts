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

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    // TODO: Send status and response
    return res.status(404).send('not found');
  }

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return res.status(403).send('Password do not match');
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
  getUsers,
  registerUser,
  loginUser,
};
