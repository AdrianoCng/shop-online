import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

import { ValidateError } from '@errors/index';
import tryCatch from './tryCatch';

const validate = (validations: ValidationChain[]) =>
  tryCatch(async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    return next(new ValidateError(errors));
  });

export default validate;
