import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import prisma from '../config/db';
import { AuthenticatedRequest, AppError } from '../types';

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authentication required. Missing Bearer token.', 401, 'UNAUTHORIZED');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AppError('Invalid token format.', 401, 'UNAUTHORIZED');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      id: string;
      email: string;
      role: any;
    };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        department: true,
        branch: true,
        block: true,
        room: true,
        roll: true,
      },
    });

    if (!user) {
      throw new AppError('User belonging to this token no longer exists.', 401, 'UNAUTHORIZED');
    }

    req.user = user;
    next();
  } catch (err: any) {
    if (err instanceof jwt.JsonWebTokenError || err instanceof jwt.TokenExpiredError) {
      next(new AppError('Invalid or expired authentication token.', 401, 'TOKEN_INVALID'));
    } else {
      next(err);
    }
  }
};
