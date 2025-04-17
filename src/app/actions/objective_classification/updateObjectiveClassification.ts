import { prisma } from '@/lib/prisma';
import type { ObjectiveClassification } from '@prisma/client';

export async function updateObjectiveClassification(objectiveClasificationId: number, data: ObjectiveClassification) {
  try {
    await prisma.objectiveClassification.update({
      where: { id: objectiveClasificationId },
      data: data,
    });
    return "Objective Clasification has been updated";
  } catch (error) {
    throw new Error('Failed to update objective classification');
  }
} 