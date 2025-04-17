import { prisma } from '@/lib/prisma';
import type { ObjectiveClassification } from '@prisma/client';

export async function createObjectiveClassification(data: ObjectiveClassification) {
  try {
    await prisma.objectiveClassification.create({
      data : data,
    });
    return "Clasification with weight has been created for objective";
  } catch (error) {
    throw new Error('Failed to create objective classification');
  }
} 