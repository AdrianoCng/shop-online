import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import CustomError, { ICustomError } from './CustomError';

class ConflictError extends CustomError {
  statusCode = StatusCodes.CONFLICT;

  constructor(message: string = ReasonPhrases.CONFLICT) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);

    this.message = message;
  }

  formatErrors(): ICustomError[] {
    return [{ msg: this.message }];
  }
}

export default ConflictError;
