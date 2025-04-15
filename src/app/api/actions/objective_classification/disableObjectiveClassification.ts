import { prisma } from '../../../../lib/prisma';

export async function disableObjectiveClassification(id: number) {
  try {
    const objectiveClassification = await prisma.objectiveClassification.update({
      where: { id },
      data: { deactived: true },
    });
    return objectiveClassification;
  } catch (error) {
    throw new Error('Failed to disable objective classification');
  }
} 