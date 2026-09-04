import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { loginSchema } from '../validators/auth.schema';

const router = Router();

router.post('/login', validate(loginSchema), AuthController.login);

export default router;
