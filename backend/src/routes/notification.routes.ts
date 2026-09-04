import { Router } from 'express';
import { NotificationController } from '../controllers/notification.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, NotificationController.getNotifications);

export default router;
