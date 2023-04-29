import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { Product } from '../models';
import InternalServerError from '../errors/InternalServerError';

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  const paginatedProducts = req.paginatedResults;

  if (!paginatedProducts) {
    return next(new InternalServerError());
  }

  return res.status(StatusCodes.OK).json(paginatedProducts);
};

const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.create(req.body);

  if (!product) {
    return next(new Error(ReasonPhrases.INTERNAL_SERVER_ERROR));
  }

  return res.status(StatusCodes.CREATED).json(product);
};

export default {
  getAllProducts,
  postProduct,
};
