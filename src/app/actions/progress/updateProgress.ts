import { prisma } from '@/lib/prisma';
import type { Progress } from '@prisma/client';

export async function updateProgress(progressId: number, data: Progress) {
  try {
    await prisma.progress.update({
      where: { id: progressId },
      data,
    });
    return "Progress has been updated";
  } catch (error) {
    throw new Error('Failed to update progress');
  }
} 