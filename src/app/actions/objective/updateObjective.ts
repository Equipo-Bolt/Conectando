"use server";

import { getClassificationById } from "@/lib/fetches/classification/getClassificationById";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";
import { prisma } from "@/lib/prisma";

import { UpdateObjectiveFormData } from "@/types/Objective";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * updateObjectiveAction() This function updates an objective
 * * Checks for dupes
 *
 * @param prevState<ServerActionResponse | null> Initial state of action, set this parameter to null
 * @param data<{@link UpdateObjectiveFormData}> Must include classificationCatalogID to assign new classification and new atributes for "id" "formID" | "title" | "goal" | "result" | "weight"
 * @returns Promise of type {@link ServerActionResponse}
 */
export async function updateObjectiveAction(
  prevState: ServerActionResponse | null,
  data: UpdateObjectiveFormData
): Promise<ServerActionResponse> {
  try {
    //! Debugging errors, should not appear for user
    if (!data.id) {
      throw new Error(
        "Data debe contener en id el id del objetivo a modificar"
      );
    }

    if (!data.formID) {
      throw new Error(
        "Data debe contener en formID el id del form en el que esta el objetivo"
      );
    }

    if (!data.classification) {
      throw new Error(
        "Data debe contener en classification el id de la nueva classificacion a modificar"
      );
    }

    const parsedData = {
      ...data,
      weight: Number(data.weight),
      classification: Number(data.classification),
      grade: Number(data.grade),
    };
    const { id, formID, classification, ...dataWithoutIDs } = parsedData;

    const targetClassification = await getClassificationById(
      parsedData.classification
    );

    if (!targetClassification) {
      throw new Error("La clasificación no se encuentra en los catalogos");
    }

    //TODO rework this logic, because it wont give past created relations
    const objectivesFromObjectives = await getObjectivesByFormId(
      Number(parsedData.formID)
    );

    const relationId = objectivesFromObjectives.find(
      (ofo) => ofo.classificationTitle === targetClassification.title
    )?.objectiveClassificationID;

    if (!relationId) {
      const newObjectiveClassification =
        await prisma.objectiveClassification.create({
          data: {
            weight: 0,
            classificationCatalog: {
              connect: {
                id: targetClassification.id,
              },
            },
          },
        });

      await prisma.form.update({
        where: { id: parsedData.formID, deactivated: false },
        data: {
          objectives: {
            create: {
              ...dataWithoutIDs,
              weight: Number(dataWithoutIDs.weight),
              objectiveClassificationID: newObjectiveClassification.id,
            },
          },
        },
      });

      return { success: true, message: "Se ha Actualizado el Objetivo" };
    }

    const duplicateObjective = await prisma.objective.findFirst({
      where: {
        ...dataWithoutIDs,
        objectiveClassification: {
          classificationCatalogID: {
            equals: parsedData.classification,
          },
        },
        deactivated: false,
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
      data: {
        ...dataWithoutIDs,
        objectiveClassification: {
          connect: {
            id: Number(relationId),
          },
        },
      },
    });

    return { success: true, message: "Se ha Actualizado el Objetivo" };
  } catch (error) {
    console.error(`Failed to update Objective: ${(error as Error).message}`);
    return { success: false, error: (error as Error).message };
  }
}
