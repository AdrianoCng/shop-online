import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import CustomError from './CustomError';

class AuthError extends CustomError {
  readonly statusCode = StatusCodes.UNAUTHORIZED;

  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }

  formatErrors() {
    return [{ msg: this.message || ReasonPhrases.UNAUTHORIZED }];
  }
}

export default AuthError;
