import { UsersCollection } from '../db/users.js';
import { SORT_ORDER } from '../constants/index.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllUsers = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const usersQuery = UsersCollection.find({ userId });

  if (filter.type) {
    usersQuery.where('userType').equals(filter.gender);
  }

  const [usersCount, users] = await Promise.all([
    UsersCollection.find().merge(usersQuery).countDocuments(),
    usersQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(usersCount, perPage, page);

  return {
    data: users,
    ...paginationData,
  };
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById({ _id: userId });
  return user;
};

export const createUser = async (payload, req) => {
  const user = await UsersCollection.create({
    ...payload,
  });
  return user;
};

export const updateUser = async (payload, options = {}, userId) => {
  const rawResult = await UsersCollection.findOneAndUpdate(
    { _id: userId }, 
    payload,
    {
      new: true,
      ...options,
    },
  );
  console.log('Updating user with ID:', userId);

  if (!rawResult) return null; 

  return {
    contact: rawResult,
  };
};
