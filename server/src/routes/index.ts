import { Router } from 'express';

import authRouter from './auth';
import productRouter from './products';
import customersRouter from './customers';

const router = Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/customers', customersRouter);

export default router;
