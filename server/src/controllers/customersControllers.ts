import CustomError from '@errors/CustomError';
import { Customer } from '@models/Customer';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getCustomerDetails = async (req: Request, res: Response, next: NextFunction) => {
  const customerID = req.params.id;

  if (!customerID) {
    return next(new CustomError(StatusCodes.BAD_REQUEST));
  }

  const customer = await Customer.findById(customerID);

  if (!customer) {
    return next(new CustomError(StatusCodes.NOT_FOUND));
  }

  return res.status(StatusCodes.OK).json(customer);
};

export default {
  getCustomerDetails,
};
