import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

export class NotificationController {
  static async getNotifications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const notifications = await prisma.notification.findMany({
        orderBy: { createdAt: 'desc' },
      });
      res.status(200).json(
        notifications.map((n) => ({
          id: n.id,
          message: n.message,
          type: n.type,
          createdAt: n.createdAt.toISOString(),
        }))
      );
    } catch (error) {
      next(error);
    }
  }
}
