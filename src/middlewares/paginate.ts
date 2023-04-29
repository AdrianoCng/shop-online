import { NextFunction, Request, Response } from 'express';
import { FilterQuery, Model } from 'mongoose';

import { tryCatch } from '@middlewares/index';

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace Express {
    interface Request {
      paginatedResults?: {
        page: number;
        limit: number;
        total: number;
        pageTotal: number;
        lastPage: number;
        data: Array<unknown>;
      };
    }
  }
}

export default function paginate<TModel>(
  YourModel: Model<TModel>,
  query: FilterQuery<TModel> = {}
) {
  return tryCatch(async (req: Request, _: Response, next: NextFunction) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skipCount = (page - 1) * limit;

    const data = await YourModel.find(query).skip(skipCount).limit(limit);
    const total = await YourModel.countDocuments(query);

    const pageTotal = data.length;
    const lastPage = Math.ceil(total / limit);

    req.paginatedResults = {
      page,
      limit,
      total,
      pageTotal,
      lastPage,
      data,
    };

    return next();
  });
}
