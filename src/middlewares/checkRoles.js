import createHttpError from 'http-errors';
import { ROLES } from '../constants/index.js';
import { WorkersCollection } from '../db/models/workers.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      return next(createHttpError(401));
    }

    const { role, _id } = user;
    const { userId } = req.params;

    if (roles.includes(ROLES.OWNER) && role === ROLES.OWNER) {
      return next();
    }

    if (roles.includes(ROLES.WORKER) && role === ROLES.WORKER) {
      if (userId && userId === _id.toString()) {
        return next();
      }

      if (userId) {
        const target = await WorkersCollection.findOne({
          _id: userId,
          parentId: _id,
        });

        if (target) {
          return next();
        }
      }

      if (req.path === '/' && req.method === 'GET') {
        req.query.parentId = _id.toString();
        return next();
      }

      return next(createHttpError(403, 'Forbidden'));
    }

    return next(createHttpError(403));
  };
