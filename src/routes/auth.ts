import { Router } from 'express';

import { tryCatch, validate } from '../middlewares';
import { authControllers } from '../controllers';
import { signupValidation } from '../validations';

const authRouter = Router();

authRouter.get('/login', tryCatch(authControllers.getUsers));
authRouter.post('/signup', validate(signupValidation), tryCatch(authControllers.registerUser));

export default authRouter;
