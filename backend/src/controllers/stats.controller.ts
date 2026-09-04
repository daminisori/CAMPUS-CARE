import { Response, NextFunction } from 'express';
import { StatsService } from '../services/stats.service';
import { AuthenticatedRequest, AppError } from '../types';

export class StatsController {
  static async getStats(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Unauthorized', 401, 'UNAUTHORIZED');
      }
      const stats = await StatsService.getStats(req.user);
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
}
