import { Router } from 'express';

import { tryCatch, validate } from '../middlewares';
import { authControllers } from '../controllers';
import { loginValidation, signupValidation } from '../validations';

const authRouter = Router();

authRouter.post('/login', validate(loginValidation), tryCatch(authControllers.loginUser));
authRouter.post('/signup', validate(signupValidation), tryCatch(authControllers.registerUser));

export default authRouter;
