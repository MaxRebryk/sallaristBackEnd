import { model, Schema } from 'mongoose';
import { ROLES } from '../../constants/index.js';

const workersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.OWNER, ROLES.WORKER],
      default: ROLES.WORKER,
    },
  },

  { timestamps: true, versionKey: false },
);

workersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const WorkersCollection = model('workers', workersSchema);
