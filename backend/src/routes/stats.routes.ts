import { Router } from 'express';
import { StatsController } from '../controllers/stats.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/stats', authenticate, StatsController.getStats);

export default router;
