import { prisma } from '../../../../lib/prisma';
import type { User } from '@prisma/client';

export async function updateUser(id: number, data: User) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data,
    });
    return user;
  } catch (error) {
    throw new Error('Failed to update user');
  }
} 