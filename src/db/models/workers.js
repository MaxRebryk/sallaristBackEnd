import { model, Schema } from 'mongoose';

const workersSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

workersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const WorkersCollection = model('workers', workersSchema);
