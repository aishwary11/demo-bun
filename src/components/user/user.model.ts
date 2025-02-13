import constant from '@/common/constant';
import bcrypt from 'bcrypt';
import type { Document, Model } from 'mongoose';
import { model, Schema } from 'mongoose';

type User = Document & {
  email: string;
  password: string;
};

const UserSchema: Schema<User> = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(constant.saltRound);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel: Model<User> = model<User>('User', UserSchema);
export default UserModel;
