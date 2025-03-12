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

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllUsersController));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.post(
  '/',
  validateBody(createUserSchema),
  ctrlWrapper(createUserController),
);

router.patch(
  '/:userId',
  isValidId,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

export default router;
