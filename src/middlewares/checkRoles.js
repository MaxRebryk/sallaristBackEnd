import createHttpError from 'http-errors';

import { ROLES } from '../constants/index.js';
import { UsersCollection } from '../db/users.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(createHttpError(401));
    }

    const { role } = user;

    if (roles.includes(ROLES.OWNER) && role === ROLES.OWNER) {
      return next();
    }

    if (roles.includes(ROLES.WORKER) && role === ROLES.WORKER) {
      const { userId } = req.params;

      if (userId) {
        const worker = await UsersCollection.findOne({
          _id: userId,
          parentId: user._id,
        });
        if (worker) {
          return next();
        }
      }

      if (req.path === '/users') {
        req.query.parentId = user._id.toString();
        return next();
      }

      return next(createHttpError(403));
    }

    return next(createHttpError(403));
  };
