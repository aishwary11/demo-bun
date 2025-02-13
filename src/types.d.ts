import type { NextFunction, Request, Response } from 'express';

type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

type ResponseData = {
  msg: string | null;
  data?: any;
  status: boolean;
};

type AuthenticatedRequest = Request & {
  user?: any;
};

type ErrorHandler = Error & {
  statusCode?: number;
};
