import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import CustomError from './CustomError';

class AuthError extends CustomError {
  readonly statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string = ReasonPhrases.UNAUTHORIZED) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message;
  }

  formatErrors() {
    return [{ msg: this.message }];
  }
}

export default AuthError;
