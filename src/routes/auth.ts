import { Router } from 'express';

import { tryCatch } from '../middlewares';
import { authControllers } from '../controllers';

const authRouter = Router();

authRouter.get('/login', tryCatch(authControllers.getUsers));

export default authRouter;
