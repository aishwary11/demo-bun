import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import { STATUS_CODES } from '../../common/constant';
import asyncHandler from '../../common/utils/asynchandler';
import responseHelper from '../../common/utils/responsehelpers';
import { generateToken } from '../../common/utils/token';
import User from './user.model';

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return responseHelper(res, STATUS_CODES.NOT_FOUND, 'User not found');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return responseHelper(res, STATUS_CODES.UNAUTHORIZED, 'Invalid credentials');
  }
  const { password: userPassword, ...userDetaills } = user.toObject();
  const token = await generateToken(userDetaills);
  return responseHelper(res, STATUS_CODES.OK, 'Login successful', { token });
});

const register = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      return responseHelper(res, STATUS_CODES.BAD_REQUEST, 'User already exists');
    }
    await User.create({ email, password });
    return responseHelper(res, STATUS_CODES.CREATED, 'User created');
  } catch (error) {
    return responseHelper(res, STATUS_CODES.INTERNAL_SERVER_ERROR, 'Error creating user', error);
  }
});

export default { register, login };
