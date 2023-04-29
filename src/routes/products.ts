import { Router } from 'express';

import { tryCatch, validate, paginate } from '../middlewares';
import { productsControllers } from '../controllers';
import { postProductValidation } from '../validations';
import { Product } from '../models';

const productRouter = Router();

productRouter.get('/', paginate(Product), tryCatch(productsControllers.getAllProducts));
productRouter.post('/', validate(postProductValidation), tryCatch(productsControllers.postProduct));

export default productRouter;
