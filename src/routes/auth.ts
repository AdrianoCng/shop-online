import { Router } from 'express';

import { authControllers } from '../controllers';

const authRouter = Router();

authRouter.get('/login', authControllers.getUsers);

export default authRouter;
