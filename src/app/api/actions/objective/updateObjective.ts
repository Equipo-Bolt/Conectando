import { prisma } from '../../../../lib/prisma';
import type { Objective } from '@prisma/client';

export async function updateObjective(id: number, data: Objective) {
  try {
    const objective = await prisma.objective.update({
      where: { id },
      data,
    });
    return objective;
  } catch (error) {
    throw new Error('Failed to update objective');
  }
} 