import { Router } from 'express';

import { tryCatch, validate, paginate } from '@middlewares/index';
import { productsControllers } from '@controllers/index';
import { postProductValidation } from '@validations/index';
import { Product } from '@models/index';

const productRouter = Router();

productRouter.get('/', paginate(Product), tryCatch(productsControllers.getAllProducts));
productRouter.post('/', validate(postProductValidation), tryCatch(productsControllers.postProduct));

export default productRouter;
