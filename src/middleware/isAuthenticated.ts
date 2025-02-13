import type { NextFunction, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import asyncHandler from '../common/utils/asynchandler';
import responseHelper from '../common/utils/responsehelpers';
import { verifyToken } from '../common/utils/token';
import type { AuthenticatedRequest } from '../types';

const isAuthenticated = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return responseHelper(res, STATUS_CODES.UNAUTHORIZED, 'Access Denied!');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return responseHelper(res, STATUS_CODES.UNAUTHORIZED, 'Access Denied!');
  }
  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return responseHelper(res, STATUS_CODES.UNAUTHORIZED, 'Access Denied!');
  }
});

export default isAuthenticated;
