import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import CustomError from '../errors/CustomError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.formatErrors() });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [
      {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
      },
    ],
  });
};

export default errorHandler;
