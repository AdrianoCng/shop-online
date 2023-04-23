import { Router } from 'express';

import { tryCatch, validate } from '../middlewares';
import { productsControllers } from '../controllers';
import { postProductValidation } from '../validations';

const productRouter = Router();

productRouter.get('/', tryCatch(productsControllers.getAllProducts));
productRouter.post('/', validate(postProductValidation), tryCatch(productsControllers.postProduct));

export default productRouter;
