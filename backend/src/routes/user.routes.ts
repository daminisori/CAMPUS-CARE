import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/me', authenticate, AuthController.getMe);

export default router;
