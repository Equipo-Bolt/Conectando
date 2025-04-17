import { prisma } from '@/lib/prisma';

export async function disableObjective(objectiveId: number) {
  try {
    await prisma.objective.update({
      where: { id: objectiveId },
      data: { deactived: true },
    });
    return "Objective has been disabled";
  } catch (error) {
    throw new Error('Failed to disable objective');
  }
} 