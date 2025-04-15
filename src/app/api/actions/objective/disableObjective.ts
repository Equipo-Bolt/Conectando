import { prisma } from '../../../../lib/prisma';

export async function disableObjective(id: number) {
  try {
    const objective = await prisma.objective.update({
      where: { id },
      data: { deactived: true },
    });
    return objective;
  } catch (error) {
    throw new Error('Failed to disable objective');
  }
} 