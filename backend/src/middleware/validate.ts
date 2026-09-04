import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { AppError } from '../types';

export const validate = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(
          (err) => `${err.path.join('.')}: ${err.message}`
        ).join(', ');
        next(new AppError(`Validation error: ${errorMessages}`, 400, 'VALIDATION_ERROR'));
      } else {
        next(error);
      }
    }
  };
};
