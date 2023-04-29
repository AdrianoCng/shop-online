import { Router } from 'express';

import { tryCatch, validate } from '../middlewares';
import { productsControllers } from '../controllers';
import { postProductValidation } from '../validations';
import paginate from '../middlewares/paginate';
import { Product } from '../models';

const productRouter = Router();

productRouter.get('/', paginate(Product), tryCatch(productsControllers.getAllProducts));
productRouter.post('/', validate(postProductValidation), tryCatch(productsControllers.postProduct));

export default productRouter;
