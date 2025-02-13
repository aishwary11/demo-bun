import type { Response } from 'express';
import type { ResponseData } from '../../types';
import { STATUS_CODES } from '../constant';

const responseHelper = (res: Response, statusCode: number = STATUS_CODES.OK, msg: string = '', data?: any): Response => {
  const responseData: ResponseData = {
    msg,
    data,
    status: statusCode < STATUS_CODES.BAD_REQUEST,
  };
  return res.status(statusCode).json(responseData);
};

export default responseHelper;
