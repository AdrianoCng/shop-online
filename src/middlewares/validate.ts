import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { ICustomError } from '../errors/CustomError';
import tryCatch from './tryCatch';

const validate = (validations: ValidationChain[]) =>
  tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const statusCode = StatusCodes.BAD_REQUEST;

    const errors = validationResult(req).formatWith<ICustomError>(
      ({ param, msg, value, location }) => ({
        statusCode,
        msg: msg || ReasonPhrases.BAD_REQUEST,
        param,
        value,
        location,
      })
    );

    if (errors.isEmpty()) {
      return next();
    }

    return res.status(statusCode).json({ errors: errors.array() });
  });

export default validate;
