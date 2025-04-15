import { prisma } from '../../../../lib/prisma';
import type { Progress } from '@prisma/client';

export async function createProgress(data: Progress) {
  try {
    const progress = await prisma.progress.create({
      data,
    });
    return progress;
  } catch (error) {
    throw new Error('Failed to create progress');
  }
} 
