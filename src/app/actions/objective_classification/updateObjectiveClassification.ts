"use server";

import { prisma } from "@/lib/prisma";

import { getObjectiveClassificationById } from "@/lib/fetches/objective_classification/getObjectiveClassificationById";

import { MutateObjectiveClassification } from "@/types/ObjectiveClassification";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * updateObjectiveClassificationAction() This function modifies the weight of a classification of objectives
 *
 * @param prevState<{@link ServerActionResponse} | null> Initial state of action, set this parameter to null
 * @param data<{@link MutateObjectiveClassification}> Must include id of the relation ObjectiveClassification and new weight
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateObjectiveClassificationAction(
  prevState: ServerActionResponse | null,
  data: MutateObjectiveClassification
): Promise<ServerActionResponse> {
  try {
    //! Debugging errors, should not appear for user
    if (!data.id) {
      throw Error("Primero debes crear un objetivo en la clasificacion"); //*Data debe contener en id el id de la relación a actualizar
    }
    if (!data.weight) {
      throw Error("Data debe contener en weight el nuevo peso");
    }

    const objectiveClassificationExists = await getObjectiveClassificationById(
      data.id
    );
    if (!objectiveClassificationExists.id) {
      throw Error("Clasificación de objetivos no existe");
    }

    if (objectiveClassificationExists.weight === data.weight) {
      return { success: true, message: "No se realizaron cambios" };
    }

    if (data.weight > 100 || data.weight <= 0) {
      throw Error("Peso inválido");
    }

    await prisma.objectiveClassification.update({
      where: { id: data.id },
      data: { weight: data.weight },
    });

    return { success: true, message: "Clasificación de Objetivos modificada" };
  } catch (error) {
    console.error(
      `Failed to update ObjectiveClassification ${(error as Error).message}.`
    );
    return { success: false, error: (error as Error).message };
  }
}