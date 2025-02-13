import type { Router } from 'express';
import { Router as router } from 'express';
import { validateFormZod } from '../../common/utils/formvalidator';
import userController from './user.controller';
import { loginSchemaZod } from './user.validator';
const userRouter: Router = router();
userRouter.post('/login', validateFormZod(loginSchemaZod), userController.login);
userRouter.post('/register', userController.register);
export default userRouter;
