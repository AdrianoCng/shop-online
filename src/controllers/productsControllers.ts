import { NextFunction, Request, Response } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

import { IProduct, Product } from '../models';

const getAllProducts = async (_: Request, res: Response) => {
  const allProducts = await Product.find();

  res.status(StatusCodes.OK).json(allProducts);
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
