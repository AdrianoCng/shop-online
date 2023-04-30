import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Product } from '@models/index';
import CustomError from '@errors/CustomError';

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  const paginatedProducts = req.paginatedResults;

  if (!paginatedProducts) {
    return next(new Error());
  }

  return res.status(StatusCodes.OK).json(paginatedProducts);
};

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new Error());
  }

  return res.status(StatusCodes.CREATED).json(product);
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productID = req.params?.id;

  if (!productID) {
    return next(new CustomError(StatusCodes.BAD_REQUEST));
  }

  const deletedProduct = await Product.findByIdAndDelete(productID);

  if (!deletedProduct) {
    return next(new CustomError(StatusCodes.NOT_FOUND));
  }

  return res.status(StatusCodes.OK).json(deletedProduct);
};

export default {
  getAllProducts,
  postProduct,
  deleteProduct,
};
