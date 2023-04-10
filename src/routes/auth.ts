import { Router } from 'express';

import { tryCatch, validate } from '../middlewares';
import { authControllers } from '../controllers';
import { signupValidation } from '../validations';

const authRouter = Router();

authRouter.post('/login', tryCatch(authControllers.loginUser));
authRouter.post('/signup', validate(signupValidation), tryCatch(authControllers.registerUser));

export default authRouter;
