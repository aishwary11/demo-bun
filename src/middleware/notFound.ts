import type { Request, Response } from 'express';
import { STATUS_CODES } from '../common/constant';
import asyncHandler from '../common/utils/asynchandler';
import responseHandler from '../common/utils/responsehelpers';

export const notFound = asyncHandler(async (req: Request, res: Response) => responseHandler(res, STATUS_CODES.NOT_FOUND, 'Not Found'));

export default notFound;
