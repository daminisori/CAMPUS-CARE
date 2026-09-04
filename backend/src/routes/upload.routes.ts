import { Router } from 'express';
import { UploadController, uploadMiddleware } from '../controllers/upload.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post(
  '/',
  authenticate,
  uploadMiddleware.any(),
  UploadController.uploadFiles
);

export default router;
