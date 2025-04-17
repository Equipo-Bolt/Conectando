import { prisma } from '@/lib/prisma';

export async function disableUser(userId: number) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { deactived: true },
    });
    return "User entry has been disabled";
  } catch (error) {
    throw new Error('Failed to disable user');
  }
} 