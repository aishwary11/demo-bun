import type { NextFunction, Request, Response } from 'express';
import type { AsyncHandler } from '../../types';

const asyncHandler = (handler: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

export default asyncHandler;
