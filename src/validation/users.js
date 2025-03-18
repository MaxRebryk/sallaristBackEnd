import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Username should be a string',
    'string.min': 'Username should have at least {#limit} characters',
    'string.max': 'Username should have at most {#limit} characters',
    'any.required': 'Username is required',
  }),
  phoneNumber: Joi.string().min(10).max(13).required().messages({
    'string.min': 'Phone Number should have at least {#limit} characters',
    'string.max': 'Phone Number should have at most {#limit} characters',
    'any.required': 'Phone Number is required',
  }),
  email: Joi.string().email(),
  userType: Joi.string()
    .valid('hookahMaster', 'chef', 'chefHelper', 'waiter', 'bartender')
    .required(),
  sallary: Joi.number(),
  fine: Joi.number(),
  workDays: Joi.number(),
  parentId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phoneNumber: Joi.string().min(10).max(13),
  userType: Joi.string().valid(
    'hookahMaster',
    'chef',
    'chefHelper',
    'waiter',
    'bartender',
  ),

  sallary: Joi.number(),
  workDays: Joi.number(),
});
