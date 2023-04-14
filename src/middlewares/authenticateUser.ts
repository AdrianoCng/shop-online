import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AuthError } from '../errors';
import { TokenPayload } from '../utils/generateTokens';

const secretAccessToken = process.env.SECRET_ACCESS_TOKEN || '';

export interface UserAuthRequest extends Request {
  user: TokenPayload;
}
export default function authenticateUser(req: UserAuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new AuthError());
  }

  return jwt.verify(token, secretAccessToken, (err, user) => {
    if (err || !user) {
      return next(new AuthError());
    }

    req.user = user as TokenPayload;

    return next();
  });
}
