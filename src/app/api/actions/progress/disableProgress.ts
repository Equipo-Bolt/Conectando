import { prisma } from '../../../../lib/prisma';

export async function disableProgress(id: number) {
  try {
    const progress = await prisma.progress.update({
      where: { id },
      data: { deactived: true },
    });
    return progress;
  } catch (error) {
    throw new Error('Failed to disable progress');
  }
} 