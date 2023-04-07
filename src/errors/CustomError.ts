abstract class CustomError extends Error {
  public abstract readonly statusCode: number;

  constructor() {
    super();

    Object.setPrototypeOf(this, CustomError.prototype);
    Error.captureStackTrace(this);
  }

  abstract formatErrors(): { statusCode: number; msg: string; param?: string }[];
}

export default CustomError;
