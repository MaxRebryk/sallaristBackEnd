import { model, Schema } from 'mongoose';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    sallary: {
      type: Number,
      required: true,
    },
    fine: {
      type: Number,
      required: true,
    },
    workDays: {
      type: Number,
      required: true,
    },
    userType: {
      type: String,
      enum: ['hookahMaster', 'chef', 'chefHelper', 'waiter', 'bartender'],
      required: true,
      default: 'personal',
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'workers',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('users', usersSchema);
