"use server";

import { prisma } from "@/lib/prisma";

import { MutateObjective } from "@/types/Objective";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * updateObjectiveAction() This function updates an objective
 * * Checks for dupes
 *
 * @param prevState<ServerActionResponse | null> Initial state of action, set this parameter to null
 * @param data<{@link MutateObjective}> Must include classificationCatalogID to assign new classification and new atributes for "id" "formID" | "title" | "goal" | "result" | "weight"
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateObjectiveAction(
  prevState: ServerActionResponse | null,
  data: MutateObjective
): Promise<ServerActionResponse> {
  try {
    //! Debugging errors, should not appear for user
    if (!data.id) {
      throw new Error(
        "Data debe contener en id el id del objetivo a modificar"
      );
    }
    const { id, formID, classificationCatalogID, ...dataWithoutIDs } = data;
    const duplicateObjective = await prisma.objective.findFirst({
      where: {
        ...dataWithoutIDs,
        deactived: false,
      },
      select: {
        id: true,
      },
    });

    if (duplicateObjective) {
      throw new Error("Ya existe un Objetivo identico");
    }

    await prisma.objective.update({
      where: { id: data.id },
      data: dataWithoutIDs,
    });

    return { success: true, message: "Se ha Actualizado el Objetivo" };
  } catch (error) {
    console.error(`Failed to update Objective: ${(error as Error).message}`);
    return { success: false, error: "Se ha Actualizado el Objetivo" };
  }
}