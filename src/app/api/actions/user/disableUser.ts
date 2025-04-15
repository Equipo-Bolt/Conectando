import { prisma } from '../../../../lib/prisma';

export async function disableUser(id: number) {
  try {
    const user = await prisma.user.update({
      where: { id },
      data: { deactived: true },
    });
    return user;
  } catch (error) {
    throw new Error('Failed to disable user');
  }
} 