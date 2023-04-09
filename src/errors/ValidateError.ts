import { Result, ValidationError } from 'express-validator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import CustomError, { ICustomError } from './CustomError';

class ValidateError extends CustomError {
  public readonly errors: Result<ValidationError>;

  public readonly statusCode = StatusCodes.BAD_REQUEST;

  constructor(errors: Result<ValidationError>) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);

    this.errors = errors;
  }

  formatErrors() {
    return this.errors
      .formatWith<ICustomError>(({ param, msg, value, location }) => ({
        msg: msg || ReasonPhrases.BAD_REQUEST,
        param,
        value,
        location,
      }))
      .array();
  }
}

export default ValidateError;
