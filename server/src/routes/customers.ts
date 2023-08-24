import { Router } from 'express';

import { customersControllers } from '@controllers/index';
import tryCatch from '@middlewares/tryCatch';
import validate from '@middlewares/validate';
import { getCustomerDetailsValidation } from '@validations/index';
import paginate from '@middlewares/paginate';
import { Customer } from '@models/Customer';

const customersRouter = Router();

customersRouter.get('/', paginate(Customer), tryCatch(customersControllers.getAllCustomers));

customersRouter.get(
  '/:id',
  validate(getCustomerDetailsValidation),
  tryCatch(customersControllers.getCustomerDetails)
);

customersRouter.put('/:id', customersControllers.updateCustomerDetails);

export default customersRouter;
