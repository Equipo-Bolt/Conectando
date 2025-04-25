"use server";

import { prisma } from '@/lib/prisma';
import type { Objective } from '@prisma/client';

export async function updateObjective(objectiveId: number, data: Objective) {
  try {
      await prisma.objective.update({
        where: { id: objectiveId },
        data: data,
      });
    return "Objective has been updated";
  } catch (error) {
    throw new Error('Failed to update objective');
  }
} 