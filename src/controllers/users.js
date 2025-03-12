import createHttpError from 'http-errors';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../services/users.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getAllUsersController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const users = await getAllUsers({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found users!',
    data: users,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    return next(createHttpError(404, 'User not found'));
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found user with id ${userId} !`,

    data: user,
  });
};

export const createUserController = async (req, res, next) => {
  const user = await createUser(
    {
      ...req.body,
    },
    req,
  );

  res.status(201).json({
    status: 201,
    message: `Successfully created a user!`,
    data: user,
  });
};

export const patchUserController = async (req, res, next) => {
  try {
    const { userId } = req.params; // Отримуємо ID користувача з URL
    const payload = req.body;
    console.log('Updating user with ID:', userId);

    const result = await updateUser(payload, {}, userId);

    if (!result) {
      return next(createHttpError(404, 'User not found'));
    }

    res.json({
      status: 200,
      message: 'Successfully updated user!',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};
