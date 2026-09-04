import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AuthenticatedRequest, AppError } from '../types';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, role } = req.body;
      const result = await AuthService.login(email, password, role);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
      }
      const profile = await AuthService.getProfile(req.user.id);
      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }
}
