import { Router } from 'express';

import { loginControllers } from '../controllers';

const loginRouter = Router();

loginRouter.get('/', loginControllers.getUsers);

export default loginRouter;
