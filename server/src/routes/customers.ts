import { Router } from 'express';

import { customersControllers } from '@controllers/index';
import tryCatch from '@middlewares/tryCatch';
import validate from '@middlewares/validate';
import { getCustomerDetailsValidation } from '@validations/index';

const customersRouter = Router();

customersRouter.get(
  '/:id',
  validate(getCustomerDetailsValidation),
  tryCatch(customersControllers.getCustomerDetails)
);

export default customersRouter;
