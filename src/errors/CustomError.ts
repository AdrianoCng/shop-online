import { getReasonPhrase } from 'http-status-codes';

import AbstractError from './AbstractError';

export default class CustomError extends AbstractError {
  public readonly statusCode: number;

  constructor(statusCode: number, message = getReasonPhrase(statusCode)) {
    super();

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);

    this.statusCode = statusCode;
    this.message = message;
  }

  formatErrors() {
    return [{ msg: this.message }];
  }
}
