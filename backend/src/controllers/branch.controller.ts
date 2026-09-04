import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';

export class BranchController {
  static async getBranches(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const branches = await prisma.branch.findMany({
        orderBy: { name: 'asc' },
      });
      res.status(200).json(branches.map((b) => b.name));
    } catch (error) {
      next(error);
    }
  }
}
