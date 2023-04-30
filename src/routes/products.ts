import { Router } from 'express';

import { tryCatch, validate, paginate, authenticateUser } from '@middlewares/index';
import { productsControllers } from '@controllers/index';
import { postProductValidation } from '@validations/index';
import { Product } from '@models/index';

const productRouter = Router();

productRouter.use(authenticateUser);

productRouter.get('/', paginate(Product), tryCatch(productsControllers.getAllProducts));
productRouter.post('/', validate(postProductValidation), tryCatch(productsControllers.postProduct));
productRouter.delete('/:id', tryCatch(productsControllers.deleteProduct));

export default productRouter;
