import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import CustomError, { ICustomError } from './CustomError';

class NotFound extends CustomError {
  public readonly statusCode = StatusCodes.NOT_FOUND;

  public readonly message: string = ReasonPhrases.NOT_FOUND;

  constructor(message: string = ReasonPhrases.NOT_FOUND) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    this.message = message;
  }

  formatErrors(): ICustomError[] {
    return [{ msg: this.message }];
  }
}

export default NotFound;
