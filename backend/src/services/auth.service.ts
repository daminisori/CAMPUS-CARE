import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { env } from '../config/env';
import { AppError } from '../types';
import { UserRole } from '@prisma/client';

export class AuthService {
  static async login(email: string, password: string, role: string) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      throw new AppError('Invalid credentials. User not found.', 401, 'INVALID_CREDENTIALS');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials. Password does not match.', 401, 'INVALID_CREDENTIALS');
    }

    if (user.role !== (role as UserRole)) {
      throw new AppError(
        `Unauthorized role. Account registered as '${user.role}', but '${role}' was requested.`,
        403,
        'ROLE_MISMATCH'
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      branch: user.branch || undefined,
      department: user.department || undefined,
      block: user.block || undefined,
      room: user.room || undefined,
      roll: user.roll || undefined,
    };

    return {
      token,
      user: userProfile,
    };
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found.', 404, 'NOT_FOUND');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      branch: user.branch || undefined,
      department: user.department || undefined,
      block: user.block || undefined,
      room: user.room || undefined,
      roll: user.roll || undefined,
    };
  }
}
