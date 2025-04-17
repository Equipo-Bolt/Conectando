import { prisma } from '@/lib/prisma';
import type { User } from '@prisma/client';

export async function updateUser(userId: number, data: User) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: data,
    });
    return "User data has been updated";
  } catch (error) {
    throw new Error('Failed to update user');
  }
} 