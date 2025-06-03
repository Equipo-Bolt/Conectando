"use server";

import { prisma } from '@/lib/prisma';

export async function disableObjectiveClassification(objectiveClasificationId: number) {
  try {
    await prisma.objectiveClassification.update({
      where: { id: objectiveClasificationId },
      data: { deactivated: true },
    });
    return "Objective Clasification with weight has been disabled";
  } catch (error) {
    throw new Error('Failed to disable objective classification');
  }
} 