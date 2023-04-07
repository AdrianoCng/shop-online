import { Location } from 'express-validator';

export interface ICustomError {
  statusCode: number;
  msg: string;
  param?: string;
  value?: string;
  location?: Location;
}

abstract class CustomError extends Error {
  public abstract readonly statusCode: number;

  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this);
  }

  abstract formatErrors(): ICustomError[];
}

export default CustomError;
