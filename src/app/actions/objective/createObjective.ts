"use server";

import { prisma } from '@/lib/prisma';
import type { Objective } from '@prisma/client';

export async function createObjective(data: Objective) {

  if (!data.formID) {
    throw new Error('collaboratorID is required in data');
  }

  try {
    await prisma.form.update({
      where: { id: data.formID },
      data: {
        objectives: {
          create: data
        }
      }
    });

    return "Objective has been created for form";
  } catch (error) {
    throw new Error('Failed to create objective');
  }
} 