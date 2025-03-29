import { Router } from 'express';
import usersRouter from './users.js';
import authRouter from './auth.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);

export default router;
