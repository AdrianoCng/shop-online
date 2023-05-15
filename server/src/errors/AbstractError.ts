import { Location } from 'express-validator';

export interface IAbstractError {
  msg: string;
  param?: string;
  value?: string;
  location?: Location;
}

abstract class AbstractError extends Error {
  public abstract readonly statusCode: number;

  constructor() {
    super();

    Object.setPrototypeOf(this, AbstractError.prototype);
    Error.captureStackTrace(this);
  }

  abstract formatErrors(): IAbstractError[];
}

export default AbstractError;
