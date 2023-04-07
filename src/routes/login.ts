import { Router } from 'express';

import { loginController } from '../controllers';

const loginRouter = Router();

loginRouter.get('/', loginController.getUsers);

export default loginRouter;
