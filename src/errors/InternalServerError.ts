import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import CustomError from './CustomError';

export default class InternalServerError extends CustomError {
  public readonly statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  public readonly message = ReasonPhrases.INTERNAL_SERVER_ERROR;

  constructor() {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  formatErrors() {
    return [{ msg: this.message }];
  }
}
