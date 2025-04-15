import { prisma } from '../../../../lib/prisma';
import type { ObjectiveClassification } from '@prisma/client';

export async function createObjectiveClassification(data: ObjectiveClassification) {
  try {
    const objectiveClassification = await prisma.objectiveClassification.create({
      data,
    });
    return objectiveClassification;
  } catch (error) {
    throw new Error('Failed to create objective classification');
  }
} 