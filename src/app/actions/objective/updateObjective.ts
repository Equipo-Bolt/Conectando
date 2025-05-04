"use server";

import { prisma } from '@/lib/prisma';

import { MutateObjectiveInfo } from '@/types/TypeObjective';

/**
 * * updateObjectiveAction Esta función modifica la información de un objetivo.
 * * Tambien se asegura de no crear dupes.
 * @param prevState estado inicial para el useActionState hook
 * @param data Data del form convertida a tipo MutateObjectiveInfo
 * @returns Retorna un mensaje de exito o de fallo
 */
export async function updateObjectiveAction(
  prevState: string | null,
  data: MutateObjectiveInfo
) {

  if (!data.id) {
    throw new Error("id of Objective is required in data");
  }

  try {
    const { id, formID, classificationCatalogID, ...dataWithoutIDs } = data;
    const duplicateObjective = await prisma.objective.findFirst({
      where: { 
        ...dataWithoutIDs,
        deactived: false
      },
      select:{
        id: true
      }
    })

    if (duplicateObjective) {
      return "Ya existe un Objetivo identico." //! Fail
    }

    await prisma.objective.update({
      where: { id: data.id },
      data: dataWithoutIDs,
    });

    return "Se ha Actualizado el Objetivo"; //! Success
  } catch (error) {
    throw new Error(`Failed to update objective: ${(error as Error).message}`);
  }
} 