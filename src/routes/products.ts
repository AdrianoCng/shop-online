import { Router } from 'express';

import { tryCatch } from '../middlewares';
import { productsControllers } from '../controllers';

const productRouter = Router();

productRouter.get('/', tryCatch(productsControllers.getAllProducts));

export default productRouter;
