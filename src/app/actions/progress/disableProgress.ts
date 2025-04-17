import { prisma } from '@/lib/prisma';

export async function disableProgress(progressId: number) {
  try {
    await prisma.progress.update({
      where: { id: progressId },
      data: { deactived: true },
    });
    return "Progress has been diasbled";
  } catch (error) {
    throw new Error('Failed to disable progress');
  }
} 