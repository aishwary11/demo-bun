import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import responseHandler from '../common/utils/responsehelpers';
import type { ErrorHandler } from '../types';

const errorMiddleware: ErrorRequestHandler = (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const message = err.message || 'Internal Server Error';
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  responseHandler(res, statusCode, message);
  next(err);
};

export default errorMiddleware;
