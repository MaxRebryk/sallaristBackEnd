const parseType = (userType) => {
  const isString = typeof userType === 'string';
  if (!isString) return;
  const isType = (userType) =>
    ['hookahMaster', 'chef', 'chefHelper', 'waiter', 'bartender'].includes(
      userType,
    );

  if (isType(userType)) return userType;
};

export const parseFilterParams = (query) => {
  const { userType } = query;

  const parsedUserType = parseType(userType);

  return {
    type: parsedUserType,
  };
};
