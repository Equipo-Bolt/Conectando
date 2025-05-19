"use server";

import { prisma } from "@/lib/prisma";

import { getClassificationById } from "@/lib/fetches/classification/getClassificationById";
import { getObjectivesByFormId } from "@/lib/fetches/objective/getObjectivesByFormId";

import { MutateObjective } from "@/types/Objective";
import { ServerActionResponse } from "@/types/ServerActionResponse";

/**
 * * createObjectiveAction() This function creates an objective
 * * This function searches the objective by the given ID to see if it already has an ObjectiveClassification relation
 * * to be added to, if there are no relations this function creates it.
 *
 * @param prevState<string | null> Initial state of action, set this parameter to null
 * @param data<{@link MutateObjective}> Must include classificationCatalogID to assign new classification and new atributes for "formID" | "title" | "goal" | "result" | "weight"
 * @returns Promise of type {@link ServerActionResponse}
 */

export async function createObjectiveAction(
  prevState: ServerActionResponse | null,
  data: MutateObjective
): Promise<ServerActionResponse> {
  try {
    //! Debugging errors, should not appear for user
    if (!data.formID) {
      throw new Error(
        "Data debe contener en formID el id del formulario del objetivo"
      );
    }

    if (!data.classificationCatalogID) {
      throw new Error(
        "Data debe contener en classificationCatalogID el id de la classificación del catalogo, no de a relación"
      );
    }

    if (!data.title) {
      throw new Error("Data debe contener en title el titulo del objetivo");
    }

    if (!data.weight) {
      throw new Error("Data debe contener en weight el peso del objetivo");
    }

    const classification = await getClassificationById(Number(data.classificationCatalogID));

    if (!classification) {
      throw new Error("La clasificación no se encuentra en los catalogos");
    }

    const objectivesFromObjectives = await getObjectivesByFormId(data.formID);

    const relationId = objectivesFromObjectives.find(
      (ofo) => ofo.classificationTitle === classification.title
    )?.objectiveClassificationID;

    const { id, formID, classificationCatalogID, ...dataWithoutIds } = data;
   
    if (objectivesFromObjectives.length === 0 || !relationId) {
      const newObjectiveClassification =
        await prisma.objectiveClassification.create({
          data: {
            weight: 0,
            classificationTitle: {
              connect: {
                id: classification.id,
              },
            },
          },
        });

      await prisma.form.update({
        where: { id: data.formID, deactived: false },
        data: {
          objectives: {
            create: {
              ...dataWithoutIds,
              objectiveClassificationID: newObjectiveClassification.id,
            },
          },
        },
      });

      return { success: true,  message:"Objetivo Creado"};
    }

    const duplicateObjective = await prisma.objective.findFirst({
      where: {
        ...dataWithoutIds,
        deactived: false,
      },
      select: {
        id: true,
      },
    });

    if (duplicateObjective) {
      throw new Error("Ya existe un Objetivo identico");
    }

    await prisma.form.update({
      where: { id: data.formID, deactived: false },
      data: {
        objectives: {
          create: {
            ...dataWithoutIds,
            objectiveClassificationID: relationId,
          },
        },
      },
    });

    return { success: true, message : "Objetivo Creado"};
  } catch (error) {
    console.error(`Failed to create objective: ${(error as Error).message}`);
    return { success: false, error : (error as Error).message}
  }
}
