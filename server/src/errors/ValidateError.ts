import { Result, ValidationError } from 'express-validator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import AbstractError, { IAbstractError } from './AbstractError';

class ValidateError extends AbstractError {
  public readonly errors: Result<ValidationError>;

  public readonly statusCode = StatusCodes.BAD_REQUEST;

  constructor(errors: Result<ValidationError>) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);

    this.errors = errors;
  }

  formatErrors() {
    return this.errors
      .formatWith<IAbstractError>(({ param, msg, value, location }) => ({
        msg: msg || ReasonPhrases.BAD_REQUEST,
        param,
        value,
        location,
      }))
      .array();
  }
}

export default ValidateError;
