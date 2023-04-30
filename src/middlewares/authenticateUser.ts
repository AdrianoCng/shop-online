import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { CustomError } from '@errors/index';
import { TokenPayload } from '@utils/generateTokens';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export default function authenticateUser(req: Request, _: Response, next: NextFunction) {
  const secretAccessToken = process.env.SECRET_ACCESS_TOKEN || '';
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(new CustomError(StatusCodes.UNAUTHORIZED));
  }

  return jwt.verify(token, secretAccessToken, (err, user) => {
    if (err || !user) {
      return next(new CustomError(StatusCodes.UNAUTHORIZED));
    }

    req.user = user as TokenPayload;

    return next();
  });
}
