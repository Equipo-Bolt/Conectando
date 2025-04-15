import { prisma } from '../../../../lib/prisma';
import type { ObjectiveClassification } from '@prisma/client';

export async function updateObjectiveClassification(id: number, data: ObjectiveClassification) {
  try {
    const objectiveClassification = await prisma.objectiveClassification.update({
      where: { id },
      data,
    });
    return objectiveClassification;
  } catch (error) {
    throw new Error('Failed to update objective classification');
  }
} 