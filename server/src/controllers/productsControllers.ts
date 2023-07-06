import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Product } from '@models/index';
import { CustomError } from '@errors/index';

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
  const productID = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(productID);

  if (!deletedProduct) {
    return next(new CustomError(StatusCodes.NOT_FOUND, 'Product not found'));
  }

  return res.sendStatus(StatusCodes.NO_CONTENT);
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const productID = req.params.id;

  delete req.body?.reviews;

  const updatedProduct = await Product.findByIdAndUpdate(
    productID,
    { $set: req.body },
    { new: true, runValidators: true }
  );

  if (!updatedProduct) {
    return next(new CustomError(StatusCodes.NOT_FOUND, 'Product not found'));
  }

  return res.status(StatusCodes.OK).json(updatedProduct);
};

const addReview = async (req: Request, res: Response, next: NextFunction) => {
  const productID = req.params.id;
  const review = req.body;

  const product = await Product.findById(productID);

  if (!product) {
    return next(new CustomError(StatusCodes.NOT_FOUND, 'Product not found'));
  }

  product.reviews?.push(review);

  const updatedProduct = await product.save();

  return res.status(StatusCodes.OK).json(updatedProduct);
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const productID = req.params.id;

  if (!productID) {
    return next(new CustomError(StatusCodes.BAD_REQUEST));
  }

  const product = await Product.findById(productID);

  if (!product) {
    return next(new CustomError(StatusCodes.NOT_FOUND, 'Product not found'));
  }

  return res.status(StatusCodes.OK).json(product);
};

export default {
  getAllProducts,
  postProduct,
  deleteProduct,
  updateProduct,
  addReview,
  getById,
};
