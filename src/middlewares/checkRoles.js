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

    const { role, _id: currentUserId } = user;
    const { userId } = req.params;

    if (roles.includes(ROLES.OWNER) && role === ROLES.OWNER) {
      return next();
    }

    if (roles.includes(ROLES.WORKER) && role === ROLES.WORKER) {
      if (userId && userId === currentUserId.toString()) {
        return next();
      }

      if (req.path === '/users') {
        req.query.parentId = currentUserId.toString();
        return next();
      }

      if (userId) {
        const worker = await UsersCollection.findOne({
          _id: userId,
          parentId: currentUserId,
        });
        if (worker) {
          return next();
        }
      }

      return next(createHttpError(403));
    }

    return next(createHttpError(403));
  };
