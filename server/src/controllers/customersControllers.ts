import CustomError from '@errors/CustomError';
import { Customer } from '@models/Customer';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
  const paginatedCustomers = req.paginatedResults;

  if (!paginatedCustomers) {
    return next(new CustomError(StatusCodes.NOT_FOUND));
  }

  return res.status(StatusCodes.OK).json(paginatedCustomers);
};

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

const updateCustomerDetails = async (req: Request, res: Response, next: NextFunction) => {
  const customerID = req.params.id;

  if (!customerID) {
    return next(new CustomError(StatusCodes.BAD_REQUEST));
  }

  const updatedCustomer = Customer.findByIdAndUpdate(
    customerID,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedCustomer) {
    return next(new CustomError(StatusCodes.NOT_FOUND, 'Customer not found'));
  }

  return res.status(StatusCodes.OK).json(updatedCustomer);
};

export default {
  getCustomerDetails,
  updateCustomerDetails,
  getAllCustomers,
};
