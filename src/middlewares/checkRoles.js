import createHttpError from 'http-errors';

import { ROLES } from '../constants/index.js';
import { UsersCollection } from '../db/users.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.OWNER) && role === ROLES.OWNER) {
      next();
      return;
    }

    if (roles.includes(ROLES.WORKER) && role === ROLES.WORKER) {
      const { userId } = req.params;
      if (!userId) {
        next(createHttpError(403));
        return;
      }
      const worker = await UsersCollection.findOne({
        _id: userId,
        parentId: user._id,
      });
      if (worker) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
