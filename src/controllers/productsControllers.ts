import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Product } from '../models';

const getAllProducts = async (_: Request, res: Response) => {
  const allProducts = await Product.find();

  res.status(StatusCodes.OK).json(allProducts);
};

export default {
  getAllProducts,
};
