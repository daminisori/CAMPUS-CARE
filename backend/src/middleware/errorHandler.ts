import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';
import { env } from '../config/env';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || (err.status ? err.status : 500);
  const code = err.code || (statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'ERROR');
  const message = err.message || 'An unexpected error occurred.';

  if (statusCode === 500) {
    console.error('SERVER ERROR [500]:', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: {
      code,
      message,
      ...(env.NODE_ENV === 'development' && statusCode === 500 ? { stack: err.stack } : {}),
    },
  });
};
