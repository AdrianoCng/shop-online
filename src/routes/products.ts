import { Router } from 'express';

import { tryCatch, validate, paginate } from '@middlewares/index';
import { productsControllers } from '@controllers/index';
import {
  deleteProductValidation,
  postProductValidation,
  reviewsValidation,
  updateProductValidation,
} from '@validations/index';
import { Product } from '@models/index';

const productRouter = Router();

productRouter.get('/', paginate(Product), tryCatch(productsControllers.getAllProducts));
productRouter.post('/', validate(postProductValidation), tryCatch(productsControllers.postProduct));
productRouter.put('/:id/reviews', validate(reviewsValidation), productsControllers.addReview);
productRouter.delete(
  '/:id',
  validate(deleteProductValidation),
  tryCatch(productsControllers.deleteProduct)
);
productRouter.put(
  '/:id',
  validate(updateProductValidation),
  tryCatch(productsControllers.updateProduct)
);

export default productRouter;
