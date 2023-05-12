import { Router } from 'express';

import { tryCatch, validate } from '@middlewares/index';
import { authControllers } from '@controllers/index';
import { loginValidation, signupValidation } from '@validations/index';

const authRouter = Router();

authRouter.post('/login', validate(loginValidation), tryCatch(authControllers.loginUser));
authRouter.post('/signup', validate(signupValidation), tryCatch(authControllers.registerUser));

export default authRouter;
