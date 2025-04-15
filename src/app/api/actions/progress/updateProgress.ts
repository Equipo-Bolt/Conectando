import { prisma } from '../../../../lib/prisma';
import type { Progress } from '@prisma/client';

export async function updateProgress(id: number, data: Progress) {
  try {
    const progress = await prisma.progress.update({
      where: { id },
      data,
    });
    return progress;
  } catch (error) {
    throw new Error('Failed to update progress');
  }
} 