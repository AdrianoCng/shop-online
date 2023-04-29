import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import AbstractError from '../errors/AbstractError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AbstractError) {
    return res
      .status(err.statusCode)
      .json({ statusCode: err.statusCode, errors: err.formatErrors() });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    errors: [
      {
        msg: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
      },
    ],
  });
};

export default errorHandler;
