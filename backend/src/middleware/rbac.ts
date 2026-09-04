import { Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { AuthenticatedRequest, AppError } from '../types';

export const requireRole = (...roles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Unauthorized. Please log in first.', 401, 'UNAUTHORIZED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Forbidden. Requires one of [${roles.join(', ')}] roles. Your role is '${req.user.role}'.`,
          403,
          'FORBIDDEN'
        )
      );
    }

    next();
  };
};
