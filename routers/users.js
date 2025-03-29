import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  patchUserController,
} from '../controllers/users.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createUserSchema, updateUserSchema } from '../validation/users.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const router = Router();

router.use(authenticate);

router.get('/', checkRoles(ROLES.OWNER), ctrlWrapper(getAllUsersController));

router.get(
  '/:userId',
  checkRoles(ROLES.OWNER, ROLES.WORKER),
  isValidId,
  ctrlWrapper(getUserByIdController),
);

router.post(
  '/',
  checkRoles(ROLES.OWNER),
  validateBody(createUserSchema),
  ctrlWrapper(createUserController),
);

router.patch(
  '/:userId',
  checkRoles(ROLES.OWNER, ROLES.WORKER),
  isValidId,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;
