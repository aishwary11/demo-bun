import asyncHandler from '@/common/utils/asynchandler';
import type { NextFunction, Request, Response } from 'express';

const logger = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on('finish', () => {
    const latency = Date.now() - start;
    const formattedTime = new Intl.DateTimeFormat('hi-IN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date());
    console.log(`Time: ${formattedTime}, Method: ${req.method}, originalUrl: ${req.originalUrl}, params: ${JSON.stringify(req.params)}, body: ${JSON.stringify(req.body)}, Latency: ${latency} ms`);
  });
  next();
});

export default logger;
