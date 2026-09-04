import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AppError } from '../types';

const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname) || '.jpg';
    cb(null, `upload-${uniqueSuffix}${ext}`);
  },
});

export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new AppError('Only image files are allowed.', 400, 'INVALID_FILE_TYPE'));
    }
  },
});

export class UploadController {
  static async uploadFiles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = req.files as Express.Multer.File[] | undefined;
      const singleFile = req.file as Express.Multer.File | undefined;

      const fileList: Express.Multer.File[] = [];
      if (files && Array.isArray(files)) {
        fileList.push(...files);
      }
      if (singleFile) {
        fileList.push(singleFile);
      }

      if (fileList.length === 0) {
        throw new AppError('No files uploaded. Provide a file in field "file" or "photos".', 400, 'NO_FILE');
      }

      const host = req.get('host') || 'localhost:5000';
      const protocol = req.protocol || 'http';
      const urls = fileList.map((f) => `${protocol}://${host}/uploads/${f.filename}`);

      res.status(200).json({ urls });
    } catch (error) {
      next(error);
    }
  }
}
