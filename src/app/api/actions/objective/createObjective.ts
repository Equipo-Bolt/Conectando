import { prisma } from '../../../../lib/prisma';
import type { Objective } from '@prisma/client';

export async function createObjective(data: Objective) {

  if (!data.formID) {
    throw new Error('collaboratorID is required in data');
  }

  try {
    const objective = await prisma.objective.create({
      data,
    });

    await prisma.form.update({
      where: { id: data.formID },
      data: {
        objectives: {
          connect: { id: objective.id }
        }
      }
    });

    return objective;
  } catch (error) {
    throw new Error('Failed to create objective');
  }
} 