import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address format'),
    password: z.string().min(1, 'Password is required'),
    role: z.enum(['student', 'staff', 'admin'], {
      errorMap: () => ({ message: "Role must be 'student', 'staff', or 'admin'" }),
    }),
  }),
});
